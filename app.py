from flask import Flask, jsonify
from flask_cors import CORS
from database.models import db
from database.seed import seed_districts
import os
from datetime import datetime

# === BLUEPRINTS ===
from api.figures import figures_bp
from api.feed import feed_bp
from api.incidents import incidents_bp
from api.reports import reports_bp
from api.auth import auth_bp
from api.cyber import cyber_bp
from api.stats import stats_bp
from api.siem import siem_bp
from api.threat_intel import threat_intel_bp
from api.messages import messages_bp

app = Flask(__name__)
app.config.from_object('config.Config')

# Initialize DB
db.init_app(app)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# === Register Blueprints ===
app.register_blueprint(figures_bp, url_prefix='/api/figures')
app.register_blueprint(feed_bp, url_prefix='/api/feed')
app.register_blueprint(incidents_bp, url_prefix='/api/incidents')
app.register_blueprint(reports_bp, url_prefix='/api/reports')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(cyber_bp)  # Already has /api/cyber prefix
app.register_blueprint(stats_bp, url_prefix='/api/stats')
app.register_blueprint(siem_bp, url_prefix='/api/siem')
app.register_blueprint(threat_intel_bp, url_prefix='/api/threat-intel')
app.register_blueprint(messages_bp, url_prefix='/api/messages')

@app.route('/')
def index():
    return jsonify({
        "status": "ok",
        "message": "BD CyberWatch API Running (Secured)",
        "version": "3.0.0",
        "modules": [
            "public_figures",
            "news_feed",
            "incident_tracker", 
            "encrypted_reports",
            "cyber_threat_intel",
            "analytics"
        ]
    })

@app.route('/health')
def health():
    return jsonify({"status": "healthy", "timestamp": datetime.utcnow().isoformat(), "service": "BD CyberWatch"})

with app.app_context():
    db.create_all()
    seed_districts()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
