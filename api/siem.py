from flask import Blueprint, jsonify, request
from database.models import db, AuditLog
from datetime import datetime, timedelta
import random

siem_bp = Blueprint('siem', __name__)

@siem_bp.route('/events', methods=['GET'])
def get_security_events():
    """
    Returns recent security events for the dashboard.
    """
    # Fetch real audit logs
    logs = AuditLog.query.order_by(AuditLog.timestamp.desc()).limit(20).all()
    
    events = []
    for log in logs:
        events.append({
            "type": log.action,
            "ip": log.ip_address,
            "timestamp": log.timestamp.isoformat(),
            "severity": "high" if "FAILED" in log.action or "MALICIOUS" in log.action else "low"
        })
        
    # Add some simulated anomaly detections
    if random.random() > 0.7:
        events.append({
            "type": "ANOMALY_DETECTED",
            "ip": f"103.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}",
            "timestamp": datetime.utcnow().isoformat(),
            "severity": "medium",
            "message": "Multiple report submissions from same subnet detected."
        })
        
    return jsonify({
        "success": True,
        "events": events,
        "active_threats": random.randint(0, 5)
    })

@siem_bp.route('/geo-stats', methods=['GET'])
def get_geo_stats():
    # Simulated geo-IP mapping for attacks
    return jsonify({
        "Dhaka": 45,
        "Chittagong": 12,
        "Sylhet": 5,
        "Rajshahi": 8,
        "Outside_BD": 30
    })
