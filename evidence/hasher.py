import hashlib
import time

def hash_file(file_path):
    sha256 = hashlib.sha256()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b''):
            sha256.update(chunk)
    return sha256.hexdigest()

def create_timestamp_proof(file_path, incident_id):
    h = hash_file(file_path)
    t = int(time.time())
    return f"SHA256:{h}|TIME:{t}|ID:{incident_id}"
