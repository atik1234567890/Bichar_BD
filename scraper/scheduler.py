from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from database.models import db, Incident, DivisionStats, LiveFeedEvent
from scraper.news_scraper import scrape_all_sources
from sqlalchemy import func

scheduler = BackgroundScheduler(daemon=True)

def update_pending_days():
    print(f"[{datetime.now()}] Updating pending days...")
    incidents = Incident.query.filter(Incident.status.notin_(['verdict', 'stalled', 'forgotten'])).all()
    today = datetime.utcnow()
    for inc in incidents:
        days = (today - inc.incident_date).days
        inc.days_pending = days
        if days >= 90:
            inc.status = "forgotten"
        elif days >= 30:
            inc.status = "stalled"
    db.session.commit()

def update_division_stats():
    print(f"[{datetime.now()}] Updating district stats...")
    districts = [
        "Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Manikganj", "Munshiganj", "Rajbari", "Madaripur", "Gopalganj", "Shariatpur", "Kishoreganj", "Narsingdi",
        "Chittagong", "Cox's Bazar", "Comilla", "Brahmanbaria", "Feni", "Lakshmipur", "Noakhali", "Chandpur", "Khagrachhari", "Rangamati", "Bandarban",
        "Rajshahi", "Bogra", "Pabna", "Naogaon", "Natore", "Chapai Nawabganj", "Joypurhat", "Sirajganj",
        "Khulna", "Jessore", "Satkhira", "Bagerhat", "Kushtia", "Meherpur", "Chuadanga", "Jhenaidah", "Magura", "Narail",
        "Barisal", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati",
        "Sylhet", "Moulvibazar", "Habiganj", "Sunamganj",
        "Rangpur", "Dinajpur", "Kurigram", "Gaibandha", "Nilphamari", "Panchagarh", "Thakurgaon", "Lalmonirhat",
        "Mymensingh", "Jamalpur", "Netrokona", "Sherpur"
    ]
    for dist in districts:
        total = Incident.query.filter_by(district=dist).count()
        pending = Incident.query.filter(Incident.district == dist, Incident.status.notin_(['verdict'])).count()
        resolved = Incident.query.filter_by(district=dist, status='verdict').count()
        
        # Simple density score: total / 10 (simulated)
        crime_density = min(100, (total / 10) * 100) # Increased density factor for local districts
        
        # Simple justice score: resolved / total
        justice_score = (resolved / total * 100) if total > 0 else 0
        
        stats = DivisionStats.query.filter_by(division=dist).first()
        if stats:
            stats.total_cases = total
            stats.pending_cases = pending
            stats.resolved_cases = resolved
            stats.crime_density_score = crime_density
            stats.justice_score = justice_score
            stats.last_updated = datetime.utcnow()
    db.session.commit()

def cleanup_old_events():
    print(f"[{datetime.now()}] Cleaning up old events...")
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    LiveFeedEvent.query.filter(LiveFeedEvent.created_at < seven_days_ago).delete()
    
    # Keep max 100
    total = LiveFeedEvent.query.count()
    if total > 100:
        oldest_to_keep = LiveFeedEvent.query.order_by(LiveFeedEvent.created_at.desc()).offset(100).first()
        if oldest_to_keep:
            LiveFeedEvent.query.filter(LiveFeedEvent.created_at <= oldest_to_keep.created_at).delete()
    
    db.session.commit()

# Schedule jobs
scheduler.add_job(scrape_all_sources, 'interval', minutes=30) # Scrape every 30 minutes for real-time feel
scheduler.add_job(update_pending_days, 'interval', hours=12)
scheduler.add_job(update_division_stats, 'interval', hours=1) # Update map stats every hour
scheduler.add_job(cleanup_old_events, 'interval', hours=12)
