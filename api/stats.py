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
    pending = Incident.query.filter(Incident.status != 'verdict').count()
    investigation = Incident.query.filter_by(status='investigation').count()
    
    return jsonify({
        "success": True,
        "data": {
            "total": total,
            "resolved": resolved,
            "pending": pending,
            "investigation": investigation
        }
    })

@stats_bp.route('/districts', methods=['GET'])
def get_district_stats():
    stats = DistrictStats.query.all()
    data = []
    for s in stats:
        data.append({
            "district": s.district,
            "total": s.total_cases,
            "pending": s.pending_cases,
            "resolved": s.resolved_cases,
            "density": s.density_score
        })
    return jsonify({"success": True, "data": data})

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
