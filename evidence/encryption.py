from cryptography.fernet import Fernet
import os
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

class EvidenceEncryptor:
    def __init__(self, secret_key=None):
        if secret_key is None:
            secret_key = os.environ.get('EVIDENCE_ENCRYPTION_KEY', 'default-secret-key-change-me')
        
        salt = b'bichar_bd_salt' # In production, use a unique salt per file or store it
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(secret_key.encode()))
        self.fernet = Fernet(key)

    def encrypt_data(self, data):
        if isinstance(data, str):
            data = data.encode()
        return self.fernet.encrypt(data).decode()

    def decrypt_data(self, encrypted_data):
        if isinstance(encrypted_data, str):
            encrypted_data = encrypted_data.encode()
        return self.fernet.decrypt(encrypted_data).decode()

    def encrypt_file(self, file_path):
        with open(file_path, 'rb') as f:
            data = f.read()
        encrypted_data = self.fernet.encrypt(data)
        with open(file_path, 'wb') as f:
            f.write(encrypted_data)

    def decrypt_file(self, file_path):
        with open(file_path, 'rb') as f:
            data = f.read()
        decrypted_data = self.fernet.decrypt(data)
        with open(file_path, 'wb') as f:
            f.write(decrypted_data)
