from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import db, User
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization
import base64

messages_bp = Blueprint('messages', __name__)

# Simulated Key Storage (In a real app, use a proper key management system)
user_keys = {}

@messages_bp.route('/generate-keys', methods=['POST'])
@jwt_required()
def generate_keys():
    user_id = get_jwt_identity()
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    public_key = private_key.public_key()

    pem_private = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )
    pem_public = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    user_keys[user_id] = {"private": private_key, "public": public_key}
    
    return jsonify({
        "public_key": pem_public.decode(),
        "message": "Keys generated. Store your private key securely (Simulated: kept in memory)."
    })

@messages_bp.route('/send', methods=['POST'])
@jwt_required()
def send_message():
    data = request.get_json()
    recipient_username = data.get('recipient')
    message_text = data.get('message')
    
    recipient = User.query.filter_by(username=recipient_username).first()
    if not recipient:
        return jsonify({"msg": "Recipient not found"}), 404
        
    # In a real app, you'd fetch the recipient's public key from the DB
    # For simulation, we check our in-memory storage
    recipient_id = str(recipient.id)
    if recipient_id not in user_keys:
        return jsonify({"msg": "Recipient has not generated PGP keys"}), 400
        
    public_key = user_keys[recipient_id]["public"]
    
    encrypted = public_key.encrypt(
        message_text.encode(),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    
    return jsonify({
        "encrypted_message": base64.b64encode(encrypted).decode(),
        "status": "Message encrypted with recipient's public key (PGP Mode)"
    })
