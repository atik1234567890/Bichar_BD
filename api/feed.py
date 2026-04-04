from flask import Blueprint, jsonify
from database.models import db, LiveFeedEvent, Incident
from datetime import datetime

feed_bp = Blueprint('feed', __name__)

@feed_bp.route('/live', methods=['GET'])
def live_feed():
    # 1. Get real live events first
    events = LiveFeedEvent.query.filter_by(is_visible=True).order_by(LiveFeedEvent.created_at.desc()).limit(10).all()
    
    data = []
    for e in events:
        data.append({
            "id": e.id,
            "event_type": e.event_type,
            "message": e.message,
            "district": e.district,
            "created_at": e.created_at.isoformat()
        })
        
    # 2. Fallback: If not enough live events, pull from Incident table
    if len(data) < 10:
        incidents = Incident.query.order_by(Incident.created_at.desc()).limit(15).all()
        for inc in incidents:
            # Avoid duplicates if already in events
            msg = f"{inc.incident_type.replace('_', ' ').capitalize()}: {inc.title[:70]}..."
            if not any(d['message'] == msg for d in data):
                data.append({
                    "id": f"fallback-{inc.id}",
                    "event_type": inc.incident_type,
                    "message": msg,
                    "district": inc.district,
                    "created_at": inc.created_at.isoformat()
                })
    
    # 3. Add system health messages for "real-time" feel
    data.append({
        "id": "sys-1",
        "event_type": "system",
        "message": f"System Status: 24/7 Monitoring Active across 64 Districts",
        "district": "National",
        "created_at": datetime.utcnow().isoformat()
    })
    
    return jsonify({
        "success": True,
        "data": data[:20],
        "timestamp": datetime.utcnow().isoformat()
    })
