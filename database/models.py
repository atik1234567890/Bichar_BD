from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

class Incident(db.Model):
    __tablename__ = 'incidents'
    id = db.Column(db.Integer, primary_key=True)
    incident_id = db.Column(db.String(20), unique=True, nullable=False) # BD-YYYY-XXXX
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    incident_type = db.Column(db.String(50), nullable=False)
    division = db.Column(db.String(50), nullable=False)
    district = db.Column(db.String(50), nullable=False)
    thana = db.Column(db.String(50))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    incident_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default='reported') # reported, under_investigation, arrested, charged, verdict, stalled, forgotten
    days_pending = db.Column(db.Integer, default=0)
    source_url = db.Column(db.String(500))
    source_name = db.Column(db.String(100))
    is_verified = db.Column(db.Boolean, default=False)
    is_community_report = db.Column(db.Boolean, default=False)
    verification_label = db.Column(db.String(50)) # ai_verified, news_sourced, community_report, disputed
    evidence_hash = db.Column(db.String(64))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class PublicReport(db.Model):
    __tablename__ = 'public_reports'
    id = db.Column(db.Integer, primary_key=True)
    incident_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    division = db.Column(db.String(50), nullable=False)
    district = db.Column(db.String(50), nullable=False)
    thana = db.Column(db.String(50))
    evidence_file_path = db.Column(db.String(500))
    evidence_hash = db.Column(db.String(64))
    is_tampered = db.Column(db.Boolean, default=False)
    submission_token = db.Column(db.String(36), unique=True, default=lambda: str(uuid.uuid4()))
    status = db.Column(db.String(50), default='pending')
    ip_hash = db.Column(db.String(64), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class LiveFeedEvent(db.Model):
    __tablename__ = 'live_feed_events'
    id = db.Column(db.Integer, primary_key=True)
    event_type = db.Column(db.String(50), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    district = db.Column(db.String(50))
    is_visible = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class PublicFigure(db.Model):
    __tablename__ = 'public_figures'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255))
    party = db.Column(db.String(100))
    constituency = db.Column(db.String(100))
    incidents_count = db.Column(db.Integer, default=0)
    status = db.Column(db.String(50), default='active') # active, under_investigation, arrested, fugitive
    image_url = db.Column(db.String(500))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class DivisionStats(db.Model):
    __tablename__ = 'division_stats'
    id = db.Column(db.Integer, primary_key=True)
    division = db.Column(db.String(50), unique=True, nullable=False)
    total_cases = db.Column(db.Integer, default=0)
    pending_cases = db.Column(db.Integer, default=0)
    resolved_cases = db.Column(db.Integer, default=0)
    crime_density_score = db.Column(db.Float, default=0.0) # 0-100
    justice_score = db.Column(db.Float, default=0.0) # 0-100
    last_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
