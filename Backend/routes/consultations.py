from flask import Blueprint, request, jsonify
from routes.utils import get_db_connection, get_user_id_from_token

bp = Blueprint('consultations', __name__, url_prefix='/api/consultations')

@bp.route('', methods=['POST'])
def create_consultation():
    user_id = get_user_id_from_token(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.get_json()
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        cursor.execute(
            """INSERT INTO consultations 
               (user_id, full_name, email, phone, service_type, date, time, address, notes) 
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (user_id, data.get('full_name'), data.get('email'), data.get('phone'),
             data.get('service_type'), data.get('date'), data.get('time'),
             data.get('address'), data.get('notes'))
        )
        connection.commit()
        last_id = cursor.lastrowid
        cursor.close()
        connection.close()
        
        return jsonify({'id': last_id}), 201
    except Exception as e:
        print(f"Error: {e}")
        connection.close()
        return jsonify({'error': str(e)}), 500

@bp.route('', methods=['GET'])
def get_consultations():
    user_id = get_user_id_from_token(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM consultations WHERE user_id = %s ORDER BY date DESC",
            (user_id,)
        )
        consultations = cursor.fetchall()
        cursor.close()
        connection.close()
        
        return jsonify(consultations), 200
    except Exception as e:
        connection.close()
        return jsonify({'error': str(e)}), 500
