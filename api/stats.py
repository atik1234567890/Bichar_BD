from flask import Blueprint, jsonify
from database.models import db, Incident, DivisionStats
from datetime import datetime
from sqlalchemy import func

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/detailed', methods=['GET'])
def detailed_stats():
    # Group by incident_type and status
    results = db.session.query(
        Incident.incident_type, 
        Incident.status, 
        func.count(Incident.id)
    ).group_by(Incident.incident_type, Incident.status).all()
    
    # Process into a structured format
    stats_map = {}
    for crime_type, status, count in results:
        if crime_type not in stats_map:
            stats_map[crime_type] = {"total": 0, "resolved": 0, "pending": 0}
        
        stats_map[crime_type]["total"] += count
        if status == 'verdict':
            stats_map[crime_type]["resolved"] += count
        else:
            stats_map[crime_type]["pending"] += count
            
    return jsonify({
        "success": True,
        "data": stats_map,
        "timestamp": datetime.utcnow().isoformat()
    })

@stats_bp.route('/summary', methods=['GET'])
def summary():
    total = Incident.query.count()
    # All statuses except 'verdict' are considered pending or in progress
    pending = Incident.query.filter(Incident.status != 'verdict').count()
    resolved = Incident.query.filter_by(status='verdict').count()
    today_count = Incident.query.filter(Incident.created_at >= datetime.utcnow().date()).count()
    stalled_count = Incident.query.filter_by(status='stalled').count()
    forgotten_count = Incident.query.filter_by(status='forgotten').count()
    
    return jsonify({
        "success": True,
        "data": {
            "total": total,
            "pending": pending,
            "resolved": resolved,
            "today_count": today_count,
            "stalled_count": stalled_count,
            "forgotten_count": forgotten_count
        },
        "timestamp": datetime.utcnow().isoformat()
    })

@stats_bp.route('/divisions', methods=['GET'])
def divisions():
    # Dynamic generation of division stats based on Incident table
    # Group by district and calculate counts
    stats_query = db.session.query(
        Incident.district,
        func.count(Incident.id).label('total'),
        func.count(func.nullif(Incident.status != 'verdict', False)).label('pending'),
        func.count(func.nullif(Incident.status == 'verdict', False)).label('resolved')
    ).group_by(Incident.district).all()
    
    # Map results to a dictionary for easy access
    stats_map = {row.district: row for row in stats_query}
    
    # Get all districts from DivisionStats to ensure we return a complete list
    all_districts = DivisionStats.query.all()
    
    data = []
    for s in all_districts:
        row = stats_map.get(s.division)
        total = row.total if row else 0
        pending = row.pending if row else 0
        resolved = row.resolved if row else 0
        
        # Calculate scores dynamically
        crime_density = min(100, (total * 10)) # Just a multiplier for visualization
        justice_score = (resolved / total * 100) if total > 0 else 0
        
        data.append({
            "division": s.division,
            "total_cases": total,
            "pending_cases": pending,
            "resolved_cases": resolved,
            "crime_density_score": round(crime_density, 1),
            "justice_score": round(justice_score, 1),
            "last_updated": datetime.utcnow().isoformat()
        })
        
    # Sort by total cases desc
    data.sort(key=lambda x: x['total_cases'], reverse=True)
    
    return jsonify({
        "success": True,
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    })

@stats_bp.route('/types', methods=['GET'])
def types():
    counts = db.session.query(Incident.incident_type, func.count(Incident.id)).group_by(Incident.incident_type).all()
    data = {t: count for t, count in counts}
    return jsonify({
        "success": True,
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    })
