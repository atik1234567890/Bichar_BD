from flask import Blueprint, jsonify
from database.models import db, Incident, DistrictStats
from sqlalchemy import func
from datetime import datetime, timedelta

stats_bp = Blueprint('stats', __name__)

# Note: We can't import 'cache' from app.py due to circular imports
# In a real app, you'd use a shared cache instance or a different structure
# For this task, we'll focus on the logic and assume the app factory pattern is improved if needed.

@stats_bp.route('/summary', methods=['GET'])
def get_summary():
    # Cache handled at app level or using a helper if available
    total = Incident.query.count()
    resolved = Incident.query.filter_by(status='verdict').count()
    active = Incident.query.filter(Incident.status != 'verdict').count()
    under_investigation = Incident.query.filter_by(status='under_investigation').count()
    
    return jsonify({
        "success": True,
        "data": {
            "total": total,
            "active": active,
            "verdict_given": resolved,
            "under_investigation": under_investigation
        }
    })

@stats_bp.route('/districts', methods=['GET'])
def get_district_stats():
    # Update district stats from incidents before returning
    from scraper.nlp_processor import BANGLADESH_DISTRICTS
    from sqlalchemy import func
    
    district_counts = db.session.query(
        Incident.district, 
        func.count(Incident.id).label('total'),
        func.count(func.nullif(Incident.status != 'verdict', False)).label('pending'),
        func.count(func.nullif(Incident.status == 'verdict', False)).label('resolved')
    ).group_by(Incident.district).all()
    
    counts_map = {d.district: d for d in district_counts}
    
    data = []
    for dist_bn, dist_info in BANGLADESH_DISTRICTS.items():
        dist_en = dist_info['en']
        stats = counts_map.get(dist_en)
        
        data.append({
            "district": dist_en,
            "total": stats.total if stats else 0,
            "pending": stats.pending if stats else 0,
            "resolved": stats.resolved if stats else 0,
            "density": min(100, (stats.total * 5) if stats else 0)
        })
    
    return jsonify({"success": True, "data": data})

@stats_bp.route('/category-breakdown', methods=['GET'])
def get_category_breakdown():
    categories = db.session.query(
        Incident.incident_type, 
        func.count(Incident.id)
    ).group_by(Incident.incident_type).all()
    
    return jsonify({
        "success": True, 
        "data": {cat: count for cat, count in categories}
    })

@stats_bp.route('/pressure-score', methods=['GET'])
def get_pressure_score():
    # Implement pressure score algorithm:
    # score = (days_since_filing × 0.3) + (media_coverage_count × 0.4) + (public_reports × 0.3)
    # For now, using average pending days as a proxy for days_since_filing
    from database.models import PublicReport
    
    avg_pending = db.session.query(func.avg(Incident.days_pending)).filter(Incident.status != 'verdict').scalar() or 0
    # Normalize avg_pending (assume 365 days is 100%)
    pending_score = min(100, (avg_pending / 365) * 100)
    
    # Media coverage - using total incidents as a proxy for coverage density
    total_incidents = Incident.query.count()
    media_score = min(100, (total_incidents / 500) * 100)
    
    # Public reports count
    report_count = PublicReport.query.count()
    report_score = min(100, (report_count / 100) * 100)
    
    final_score = int((pending_score * 0.3) + (media_score * 0.4) + (report_score * 0.3))
    
    return jsonify({
        "success": True,
        "data": {
            "score": final_score
        }
    })

@stats_bp.route('/analytics', methods=['GET'])
def get_analytics():
    # 1. Timeline (Last 12 months)
    now = datetime.utcnow()
    timeline = []
    for i in range(11, -1, -1):
        month_date = now - timedelta(days=i*30)
        month_start = datetime(month_date.year, month_date.month, 1)
        next_month = month_start + timedelta(days=32)
        month_end = datetime(next_month.year, next_month.month, 1)
        
        count = Incident.query.filter(Incident.created_at >= month_start, Incident.created_at < month_end).count()
        timeline.append({
            "month": month_start.strftime("%b"),
            "count": count
        })

    # 2. Trending (Last 24h)
    yesterday = now - timedelta(hours=24)
    trending = Incident.query.filter(Incident.created_at >= yesterday).order_by(Incident.created_at.desc()).limit(5).all()
    trending_data = [{
        "id": t.incident_id,
        "title": t.title,
        "district": t.district,
        "type": t.incident_type
    } for t in trending]

    # 3. Pressure Score
    # Simplified calculation: (avg pending days / 30) * 50 + (scraped sources count / 10) * 50
    avg_pending = db.session.query(func.avg(Incident.days_pending)).scalar() or 0
    pressure_score = min(100, int((avg_pending / 60) * 100))

    return jsonify({
        "success": True,
        "data": {
            "timeline": timeline,
            "trending": trending_data,
            "pressure_score": pressure_score
        }
    })
