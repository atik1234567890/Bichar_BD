from flask import Flask, render_template, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from database.models import db
from database.seed import seed_divisions, seed_figures, seed_massive_data, seed_historical_archive
from api.incidents import incidents_bp
from api.stats import stats_bp
from api.reports import reports_bp
from api.feed import feed_bp
from api.figures import figures_bp
from scraper.scheduler import scheduler
from scraper.autonomous_brain import start_brain
import os

app = Flask(__name__)
app.config.from_object('config.Config')

# Initialize DB
db.init_app(app)

# Initialize CORS
CORS(app)

# Initialize Limiter
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per hour"],
    storage_uri="memory://"
)

# Global Brain Instance
brain = None

# Register Blueprints
app.register_blueprint(incidents_bp, url_prefix='/api/incidents')
app.register_blueprint(stats_bp, url_prefix='/api/stats')
app.register_blueprint(reports_bp, url_prefix='/api/report')
app.register_blueprint(feed_bp, url_prefix='/api/feed')
app.register_blueprint(figures_bp, url_prefix='/api/figures')

@app.route('/api/brain/status')
def brain_status():
    if brain:
        return jsonify({
            "success": True,
            "version": brain.version,
            "logs": brain.health_logs[-10:], # Last 10 logs
            "status": "Self-Healing Active"
        })
    return jsonify({"success": False, "message": "Brain not initialized"})

@app.route('/health')
def health():
    return jsonify({"status": "ok", "timestamp": "ISO8601"})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/incident/<int:id>')
def incident_detail(id):
    return render_template('incident.html', incident_id=id)

@app.route('/submit')
def submit_report_page():
    return render_template('submit_report.html')

# Initialize DB and Scheduler
with app.app_context():
    db.create_all()
    seed_divisions()
    seed_figures()
    seed_historical_archive() # Load 1971-Present Historical Data
    
    # 🚨 CRITICAL: Remove all Seeded/Demo data to ensure 100% Real-Time Information
    # Only real-time scraped news and user reports will remain.
    from database.models import Incident
    deleted_count = Incident.query.filter_by(verification_label='news_sourced').delete()
    if deleted_count > 0:
        db.session.commit()
        print(f"🧹 Cleaned {deleted_count} demo/seeded incidents for 100% Real-Time Integrity.")
    
    # seed_massive_data() # Permanently disabled for real-time mode
    
    # Run initial sync immediately on startup
    from scraper.news_scraper import scrape_all_sources
    from scraper.scheduler import update_division_stats, update_pending_days
    from database.models import LiveFeedEvent
    
    # Add a neural log for startup
    db.session.add(LiveFeedEvent(
        event_type="HEAL",
        message="Neural Core Initialized. Synchronizing 1971-2026 Justice Archive...",
        district="Dhaka"
    ))
    db.session.commit()
    
    scrape_all_sources()
    update_division_stats()
    update_pending_days()
    
    # Add another log after sync
    db.session.add(LiveFeedEvent(
        event_type="GROWTH",
        message="Neural Sync Complete. Real-time monitoring active across 64 districts.",
        district="National"
    ))
    db.session.commit()
    
    brain = start_brain(app) # Start the Autonomous Brain
    if not scheduler.running:
        scheduler.start()

@app.route('/health')
def health():
    return jsonify({"status": "healthy", "timestamp": datetime.utcnow().isoformat(), "uptime": "24/7 autonomous monitoring active"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
