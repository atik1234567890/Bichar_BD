from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

class Incident(db.Model):
    __tablename__ = 'incidents'
    id              = db.Column(db.Integer, primary_key=True)
    incident_id     = db.Column(db.String(20), unique=True, nullable=False)
    title           = db.Column(db.String(500), nullable=False)
    description     = db.Column(db.Text)
    incident_type   = db.Column(db.String(50), nullable=False)
    era             = db.Column(db.String(50), default='Modern') # 1971_War, Post_Independence, 90s_Restoration, Modern
    division        = db.Column(db.String(50))
    district        = db.Column(db.String(50))
    thana           = db.Column(db.String(100))
    latitude        = db.Column(db.Float)
    longitude       = db.Column(db.Float)
    incident_date   = db.Column(db.DateTime)
    status          = db.Column(db.String(30), default='reported') # reported, under_investigation, arrested, charged, verdict, stalled, forgotten
    days_pending    = db.Column(db.Integer, default=0)
    source_url      = db.Column(db.String(500))
    source_name     = db.Column(db.String(100))
    url_hash        = db.Column(db.String(64), unique=True)
    is_verified     = db.Column(db.Boolean, default=False)
    is_community    = db.Column(db.Boolean, default=False)
    verification_label = db.Column(db.String(30), default='news_sourced') # ai_verified, news_sourced, community_report, disputed, archival_verified
    evidence_hash   = db.Column(db.String(200))
    created_at      = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at      = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class PublicReport(db.Model):
    __tablename__ = 'public_reports'
    id              = db.Column(db.Integer, primary_key=True)
    token           = db.Column(db.String(36), unique=True, default=lambda: str(uuid.uuid4()))
    incident_type   = db.Column(db.String(50))
    description     = db.Column(db.Text)
    division        = db.Column(db.String(50))
    district        = db.Column(db.String(50))
    thana           = db.Column(db.String(100))
    file_path       = db.Column(db.String(300))
    file_hash       = db.Column(db.String(200))
    is_tampered     = db.Column(db.Boolean)
    ela_confidence  = db.Column(db.Integer)
    status          = db.Column(db.String(30), default='pending')
    ip_hash         = db.Column(db.String(64))
    created_at      = db.Column(db.DateTime, default=datetime.utcnow)

class LiveFeedEvent(db.Model):
    __tablename__ = 'live_feed'
    id          = db.Column(db.Integer, primary_key=True)
    event_type  = db.Column(db.String(50))
    message     = db.Column(db.String(300))
    district    = db.Column(db.String(50))
    is_visible  = db.Column(db.Boolean, default=True)
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)

class DistrictStats(db.Model):
    __tablename__ = 'district_stats'
    id              = db.Column(db.Integer, primary_key=True)
    district        = db.Column(db.String(50), unique=True)
    division        = db.Column(db.String(50))
    total_cases     = db.Column(db.Integer, default=0)
    pending_cases   = db.Column(db.Integer, default=0)
    resolved_cases  = db.Column(db.Integer, default=0)
    density_score   = db.Column(db.Integer, default=0)
    last_updated    = db.Column(db.DateTime, default=datetime.utcnow)

class ScrapeLog(db.Model):
    __tablename__ = 'scrape_logs'
    id              = db.Column(db.Integer, primary_key=True)
    source_name     = db.Column(db.String(100))
    articles_found  = db.Column(db.Integer, default=0)
    articles_saved  = db.Column(db.Integer, default=0)
    success         = db.Column(db.Boolean, default=True)
    error_message   = db.Column(db.Text)
    scraped_at      = db.Column(db.DateTime, default=datetime.utcnow)

# Legacy support for figures if needed
class PublicFigure(db.Model):
    __tablename__ = 'public_figures'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255))
    party = db.Column(db.String(100))
    constituency = db.Column(db.String(100))
    incidents_count = db.Column(db.Integer, default=0)
    status = db.Column(db.String(50), default='active')
    assets_total = db.Column(db.String(255))
    property_details = db.Column(db.Text)
    case_history = db.Column(db.Text)
    permanent_address = db.Column(db.String(500))
    current_location = db.Column(db.String(500))
    image_url = db.Column(db.String(500))
    description = db.Column(db.Text)
    assets_total = db.Column(db.String(200))
    property_details = db.Column(db.Text) # JSON list
    case_history = db.Column(db.Text) # JSON list
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)

class FigureReport(db.Model):
    __tablename__ = 'figure_reports'
    id = db.Column(db.Integer, primary_key=True)
    figure_id = db.Column(db.Integer, db.ForeignKey('public_figures.id'))
    report_content = db.Column(db.Text)
    sources = db.Column(db.Text) # JSON list of URLs
    generated_at = db.Column(db.DateTime, default=datetime.utcnow)
