from flask import Blueprint, jsonify, request
from database.models import db, Incident
from datetime import datetime

incidents_bp = Blueprint('incidents', __name__)

@incidents_bp.route('/', methods=['GET'])
def list_incidents():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 20, type=int)
    division = request.args.get('division')
    district = request.args.get('district')
    thana = request.args.get('thana')
    incident_type = request.args.get('type')
    status = request.args.get('status')
    search = request.args.get('search')
    
    query = Incident.query
    if division: query = query.filter_by(division=division)
    if district: query = query.filter_by(district=district)
    if thana: query = query.filter_by(thana=thana)
    if incident_type: query = query.filter_by(incident_type=incident_type)
    if status: query = query.filter_by(status=status)
    
    if search:
        query = query.filter(
            (Incident.title.ilike(f'%{search}%')) | 
            (Incident.description.ilike(f'%{search}%'))
        )
    
    pagination = query.order_by(Incident.created_at.desc()).paginate(page=page, per_page=limit)
    
    data = []
    for inc in pagination.items:
        data.append({
            "id": inc.id,
            "incident_id": inc.incident_id,
            "title": inc.title,
            "description": inc.description,
            "incident_type": inc.incident_type,
            "division": inc.division,
            "district": inc.district,
            "thana": inc.thana,
            "status": inc.status,
            "days_pending": inc.days_pending,
            "source_url": inc.source_url,
            "source_name": inc.source_name,
            "verification_label": inc.verification_label,
            "created_at": inc.created_at.isoformat()
        })
        
    return jsonify({
        "success": True,
        "data": data,
        "meta": {"total": pagination.total, "page": page, "pages": pagination.pages},
        "timestamp": datetime.utcnow().isoformat()
    })

@incidents_bp.route('/<int:id>', methods=['GET'])
def get_incident(id):
    inc = Incident.query.get_or_404(id)
    return jsonify({
        "success": True,
        "data": {
            "id": inc.id,
            "incident_id": inc.incident_id,
            "title": inc.title,
            "description": inc.description,
            "incident_type": inc.incident_type,
            "division": inc.division,
            "district": inc.district,
            "thana": inc.thana,
            "status": inc.status,
            "days_pending": inc.days_pending,
            "source_url": inc.source_url,
            "source_name": inc.source_name,
            "verification_label": inc.verification_label,
            "created_at": inc.created_at.isoformat()
        },
        "timestamp": datetime.utcnow().isoformat()
    })
