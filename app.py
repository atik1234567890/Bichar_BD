from flask import Flask, render_template, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from database.models import db
from database.seed import seed_divisions, seed_figures, seed_massive_data
from api.incidents import incidents_bp
from api.stats import stats_bp
from api.reports import reports_bp
from api.feed import feed_bp
from api.figures import figures_bp
from scraper.scheduler import scheduler
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

# Register Blueprints
app.register_blueprint(incidents_bp, url_prefix='/api/incidents')
app.register_blueprint(stats_bp, url_prefix='/api/stats')
app.register_blueprint(reports_bp, url_prefix='/api/report')
app.register_blueprint(feed_bp, url_prefix='/api/feed')
app.register_blueprint(figures_bp, url_prefix='/api/figures')

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
    seed_massive_data()
    if not scheduler.running:
        scheduler.start()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
