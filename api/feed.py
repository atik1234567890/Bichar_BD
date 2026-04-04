from flask import Blueprint, jsonify
from database.models import db, LiveFeedEvent
from datetime import datetime

feed_bp = Blueprint('feed', __name__)

@feed_bp.route('/live', methods=['GET'])
def live_feed():
    events = LiveFeedEvent.query.filter_by(is_visible=True).order_by(LiveFeedEvent.created_at.desc()).limit(20).all()
    data = []
    for e in events:
        data.append({
            "id": e.id,
            "event_type": e.event_type,
            "message": e.message,
            "district": e.district,
            "created_at": e.created_at.isoformat()
        })
    return jsonify({
        "success": True,
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    })
