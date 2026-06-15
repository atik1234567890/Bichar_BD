from flask import Flask, jsonify
from flask_cors import CORS
from database.models import db
from database.seed import seed_districts
import os
from datetime import datetime

app = Flask(__name__)
app.config.from_object('config.Config')

# Initialize DB
db.init_app(app)
CORS(app)

@app.route('/')
def index():
    return jsonify({"status": "ok", "message": "BicharBD API Running"})

@app.route('/health')
def health():
    return jsonify({"status": "healthy", "timestamp": datetime.utcnow().isoformat()})

with app.app_context():
    db.create_all()
    seed_districts()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
