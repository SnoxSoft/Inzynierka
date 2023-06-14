import secrets
import base64
import hashlib

def generate_salt():
    salt_bytes = secrets.token_bytes(32)
    salt = base64.b64encode(salt_bytes).decode('utf-8')
    return salt

def hash_password(password, salt):
    salt_bytes = base64.b64decode(salt)
    password_bytes = password.encode('utf-8')

    combined_bytes = salt_bytes + password_bytes

    hashed_bytes = hashlib.sha256(combined_bytes).digest()
    hashed_string = base64.b64encode(hashed_bytes).decode('utf-8')

    return hashed_string