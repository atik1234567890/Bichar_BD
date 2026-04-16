import pytz
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from database.models import db, Incident, DistrictStats, LiveFeedEvent
from scraper.news_scraper import scrape_all_sources
from sqlalchemy import func
from api.socket_instance import socketio

# Use Bangladesh Timezone
bd_tz = pytz.timezone('Asia/Dhaka')
scheduler = BackgroundScheduler(daemon=True, timezone=bd_tz)

def update_pending_days():
    now_bd = datetime.now(bd_tz)
    print(f"[{now_bd}] Updating pending days...")
    incidents = Incident.query.filter(Incident.status.notin_(['verdict', 'stalled', 'forgotten'])).all()
    
    status_changed = []
    for inc in incidents:
        old_status = inc.status
        # Convert incident date to BD time if it's naive
        inc_date = inc.incident_date
        if inc_date.tzinfo is None:
            inc_date = pytz.utc.localize(inc_date).astimezone(bd_tz)
        
        days = (now_bd - inc_date).days
        inc.days_pending = days
        if days >= 90:
            inc.status = "forgotten"
        elif days >= 30:
            inc.status = "stalled"
        
        if old_status != inc.status:
            status_changed.append({
                "id": inc.incident_id,
                "title": inc.title,
                "old_status": old_status,
                "new_status": inc.status
            })
    
    db.session.commit()
    
    # Emit events for status changes
    for change in status_changed:
        socketio.emit('status_change', change)

def update_division_stats():
    from scraper.nlp_processor import BANGLADESH_DISTRICTS
    now_bd = datetime.now(bd_tz)
    print(f"[{now_bd}] Updating all 64 district stats...")
    
    for dist_bn, data in BANGLADESH_DISTRICTS.items():
        dist_en = data['en']
        total = Incident.query.filter_by(district=dist_en).count()
        pending = Incident.query.filter(Incident.district == dist_en, Incident.status != 'verdict').count()
        resolved = Incident.query.filter_by(district=dist_en, status='verdict').count()
        
        # Calculate real-time density score
        crime_density = min(100, int((total / 10) * 100)) if total > 0 else 0
        
        stats = DistrictStats.query.filter_by(district=dist_en).first()
        if not stats:
            stats = DistrictStats(district=dist_en, division=data['division'])
            db.session.add(stats)
            
        stats.total_cases = total
        stats.pending_cases = pending
        stats.resolved_cases = resolved
        stats.density_score = crime_density
        stats.last_updated = datetime.now(pytz.utc)
        
    db.session.commit()
    print("✅ All 64 District statistics synchronized.")

def cleanup_old_events():
    now_bd = datetime.now(bd_tz)
    print(f"[{now_bd}] Cleaning up old events...")
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    LiveFeedEvent.query.filter(LiveFeedEvent.created_at < seven_days_ago).delete()
    
    # Keep max 100
    total = LiveFeedEvent.query.count()
    if total > 100:
        oldest_to_keep = LiveFeedEvent.query.order_by(LiveFeedEvent.created_at.desc()).offset(100).first()
        if oldest_to_keep:
            LiveFeedEvent.query.filter(LiveFeedEvent.created_at <= oldest_to_keep.created_at).delete()
    
    db.session.commit()

# Schedule jobs with BD Timezone awareness
scheduler.add_job(scrape_all_sources, 'interval', minutes=3) # Faster scraping for "Real-Time"
scheduler.add_job(update_pending_days, 'interval', hours=6)
scheduler.add_job(update_division_stats, 'interval', minutes=30) # More frequent map updates
scheduler.add_job(cleanup_old_events, 'interval', hours=12)
