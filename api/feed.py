from flask import Blueprint, jsonify
from database.models import db, LiveFeedEvent, Incident
from datetime import datetime

feed_bp = Blueprint('feed', __name__)

@feed_bp.route('/recent', methods=['GET'])
def recent_activity():
    # Returns last 10 case submissions/updates
    recent = Incident.query.order_by(Incident.created_at.desc()).limit(10).all()
    
    data = []
    for inc in recent:
        data.append({
            "id": inc.id,
            "title": inc.title,
            "district": inc.district,
            "incident_type": inc.incident_type,
            "created_at": inc.created_at.isoformat()
        })
        
    return jsonify({
        "success": True,
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    })
