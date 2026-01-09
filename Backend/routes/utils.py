import jwt
import os
import mysql.connector
from mysql.connector import Error
from datetime import datetime, timedelta

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv('MYSQL_HOST'),
            user=os.getenv('MYSQL_USER'),
            password=os.getenv('MYSQL_PASSWORD'),
            database=os.getenv('MYSQL_DATABASE')
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def verify_token(token):
    try:
        if not token:
            return None
        payload = jwt.decode(token, os.getenv('JWT_SECRET'), algorithms=['HS256'])
        return payload.get('user_id')
    except Exception as e:
        print(f"Token verification error: {e}")
        return None

def get_user_id_from_token(request):
    auth_header = request.headers.get('Authorization', '')
    if not auth_header:
        return None
    
    parts = auth_header.split()
    if len(parts) != 2 or parts[0] != 'Bearer':
        return None
    
    token = parts[1]
    return verify_token(token)

def generate_token(user_id):
    return jwt.encode(
        {'user_id': user_id, 'exp': datetime.utcnow() + timedelta(days=30)},
        os.getenv('JWT_SECRET'),
        algorithm='HS256'
    )
