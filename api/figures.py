from flask import Blueprint, jsonify, request
from database.models import db, PublicFigure
from datetime import datetime

figures_bp = Blueprint('figures', __name__)

@figures_bp.route('/search', methods=['GET'])
def search_figures():
    query_str = request.args.get('q', '')
    if not query_str:
        return jsonify({"success": True, "data": []})
        
    figures = PublicFigure.query.filter(
        (PublicFigure.name.ilike(f'%{query_str}%')) |
        (PublicFigure.role.ilike(f'%{query_str}%')) |
        (PublicFigure.party.ilike(f'%{query_str}%'))
    ).limit(10).all()
    
    data = []
    for f in figures:
        data.append({
            "id": f.id,
            "name": f.name,
            "role": f.role,
            "party": f.party,
            "constituency": f.constituency,
            "incidents_count": f.incidents_count,
            "status": f.status,
            "image_url": f.image_url,
            "description": f.description,
            "assets_total": f.assets_total,
            "property_details": f.property_details,
            "case_history": f.case_history,
            "permanent_address": f.permanent_address,
            "current_location": f.current_location
        })
        
    return jsonify({
        "success": True,
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    })

@figures_bp.route('/top', methods=['GET'])
def top_figures():
    figures = PublicFigure.query.order_by(PublicFigure.incidents_count.desc()).limit(6).all()
    data = []
    for f in figures:
        data.append({
            "id": f.id,
            "name": f.name,
            "role": f.role,
            "party": f.party,
            "constituency": f.constituency,
            "incidents_count": f.incidents_count,
            "status": f.status,
            "image_url": f.image_url
        })
    return jsonify({
        "success": True,
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    })
