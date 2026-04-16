import pytz
from flask import Blueprint, jsonify, request
from database.models import db, Incident
from datetime import datetime, timedelta

incidents_bp = Blueprint('incidents', __name__)

@incidents_bp.route('/daily', methods=['GET'])
def daily_incidents():
    # Fetch incidents from today (start of the day in Bangladesh Timezone)
    bd_tz = pytz.timezone('Asia/Dhaka')
    now_bd = datetime.now(bd_tz)
    today_start_bd = datetime(now_bd.year, now_bd.month, now_bd.day)
    
    # Convert back to UTC for DB query
    today_start_utc = bd_tz.localize(today_start_bd).astimezone(pytz.utc).replace(tzinfo=None)
    
    incidents = Incident.query.filter(Incident.created_at >= today_start_utc).order_by(Incident.created_at.desc()).all()
    
    # Fallback: if no news today, show last 7 days to keep the section active
    if not incidents:
        since_utc = datetime.utcnow() - timedelta(days=7)
        incidents = Incident.query.filter(Incident.created_at >= since_utc).order_by(Incident.created_at.desc()).limit(10).all()
    
    data = []
    for inc in incidents:
        data.append({
            "id": inc.id,
            "title": inc.title,
            "description": inc.description,
            "incident_type": inc.incident_type,
            "district": inc.district,
            "source_name": inc.source_name or "সংবাদ মাধ্যম",
            "source_url": inc.source_url,
            "created_at": inc.created_at.isoformat()
        })
        
    return jsonify({
        "success": True,
        "count": len(data),
        "data": data,
        "timestamp": now_bd.isoformat()
    })

@incidents_bp.route('/', methods=['GET'])
def list_incidents():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 20, type=int)
    era = request.args.get('era')
    division = request.args.get('division')
    district = request.args.get('district')
    thana = request.args.get('thana')
    incident_type = request.args.get('type')
    status = request.args.get('status')
    search = request.args.get('search')
    
    query = Incident.query
    if era: query = query.filter_by(era=era)
    if division: query = query.filter_by(division=division)
    if district: query = query.filter_by(district=district)
    if thana: query = query.filter_by(thana=thana)
    if incident_type: query = query.filter_by(incident_type=incident_type)
    if status: query = query.filter_by(status=status)
    
    if search:
        query = query.filter(
            (Incident.title.ilike(f'%{search}%')) | 
            (Incident.description.ilike(f'%{search}%')) |
            (Incident.district.ilike(f'%{search}%'))
        )
    
    pagination = query.order_by(Incident.created_at.desc()).paginate(page=page, per_page=limit, error_out=False)
    
    data = []
    for inc in pagination.items:
        data.append({
            "id": inc.id,
            "incident_id": inc.incident_id,
            "title": inc.title,
            "description": inc.description,
            "incident_type": inc.incident_type,
            "era": inc.era,
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
        "meta": {"total": pagination.total, "page": page, "pages": pagination.pages, "limit": limit},
        "timestamp": datetime.utcnow().isoformat()
    })

@incidents_bp.route('/archive/historical', methods=['GET'])
def historical_archive():
    eras = {
        "1971_War": "1971: War crimes",
        "Post_Independence": "1975: Political tragedy",
        "90s_Restoration": "1990s: Democracy era",
        "Modern": "2009–2024: Modern era",
        "July_Uprising": "2024: July uprising"
    }
    
    data = {}
    for era_id, era_label in eras.items():
        query = Incident.query.filter_by(era=era_id)
        # Handle 'July_Uprising' separately if it's within 'Modern'
        if era_id == "July_Uprising":
             # Assuming we mark July uprising specifically or filter by date
             query = Incident.query.filter(Incident.era == 'Modern', Incident.created_at >= datetime(2024, 7, 1))
        
        incidents = query.order_by(Incident.created_at.desc()).limit(5).all()
        data[era_id] = {
            "label": era_label,
            "incidents": [{
                "id": inc.id,
                "title": inc.title,
                "description": inc.description,
                "district": inc.district,
                "created_at": inc.created_at.isoformat(),
                "status": inc.status
            } for inc in incidents]
        }
        
    return jsonify({
        "success": True,
        "data": data,
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
            "era": inc.era,
            "division": inc.division,
            "district": inc.district,
            "thana": inc.thana,
            "status": inc.status,
            "days_pending": inc.days_pending,
            "source_url": inc.source_url,
            "source_name": inc.source_name,
            "verification_label": inc.verification_label,
            "created_at": inc.created_at.isoformat()
        }
    })
