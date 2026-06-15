import sys
import os

# Temporarily modify app to skip scheduler and brain initialization
os.environ['FLASK_SKIP_SCHEDULER'] = '1'

# Let's try importing app
print('Starting import test...')
try:
    from app import app
    print('✅ App imported successfully!')
    
    # Check database models
    from database.models import db, User, AuditLog
    print('✅ All database models imported!')
    
    # Check blueprints
    from api.auth import auth_bp
    from api.siem import siem_bp
    from api.threat_intel import threat_intel_bp
    from api.messages import messages_bp
    print('✅ All blueprints imported!')
    
except Exception as e:
    print(f'❌ ERROR importing app: {type(e).__name__}: {e}')
    import traceback
    print('Stack trace:')
    traceback.print_exc()
    sys.exit(1)
