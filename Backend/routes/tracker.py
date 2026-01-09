from flask import Blueprint, request, jsonify
from routes.utils import get_db_connection, get_user_id_from_token

bp = Blueprint('tracker', __name__, url_prefix='/api/tracker')

@bp.route('/entries', methods=['POST'])
def add_entry():
    user_id = get_user_id_from_token(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.get_json()
    if not data or not data.get('date'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO tracker_entries (user_id, date, electricity, gas, water) VALUES (%s, %s, %s, %s, %s)",
            (user_id, data['date'], data.get('electricity'), data.get('gas'), data.get('water'))
        )
        connection.commit()
        last_id = cursor.lastrowid
        cursor.close()
        connection.close()
        
        return jsonify({'id': last_id}), 201
    except Exception as e:
        connection.close()
        return jsonify({'error': str(e)}), 500

@bp.route('/entries', methods=['GET'])
def get_entries():
    user_id = get_user_id_from_token(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT id, date, electricity, gas, water FROM tracker_entries WHERE user_id = %s ORDER BY date DESC",
            (user_id,)
        )
        entries = cursor.fetchall()
        cursor.close()
        connection.close()
        
        return jsonify(entries), 200
    except Exception as e:
        connection.close()
        return jsonify({'error': str(e)}), 500

@bp.route('/entries/<int:entry_id>', methods=['DELETE'])
def delete_entry(entry_id):
    user_id = get_user_id_from_token(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM tracker_entries WHERE id = %s AND user_id = %s", (entry_id, user_id))
        connection.commit()
        cursor.close()
        connection.close()
        
        return jsonify({'success': True}), 200
    except Exception as e:
        connection.close()
        return jsonify({'error': str(e)}), 500
