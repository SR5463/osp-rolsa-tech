from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET', 'your_secret_key')

from routes import auth, tracker, consultations

app.register_blueprint(auth.bp)
app.register_blueprint(tracker.bp)
app.register_blueprint(consultations.bp)

@app.route('/health', methods=['GET'])
def health():
    return {'status': 'ok'}, 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
