import os
from flask import Flask
from flask_restful import Api
from flask_cors import CORS  # Import CORS
from application.config import LocalDevelopmentConfig
from application.security import security, user_datastore
from application.database import db
from application.initial_data import create_initial_data
from application.controllers import create_views

app = None
api = None

def create_app():
    global app, api  # Ensure global variables are modified
    app = Flask(__name__, template_folder="public")
    
    # Add CORS support
    CORS(app, resources={r"/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],  # Allow your React frontend
        "supports_credentials": True  # Support cookies if needed
    }})
    
    if os.getenv('ENV', 'development') == 'production':
        raise Exception("Currently no production config is setup.")
    else:
        print("Starting Local Development")
        app.config.from_object(LocalDevelopmentConfig)
    
    db.init_app(app)
    
    with app.app_context():
        security.init_app(app, user_datastore)
        db.create_all()
        create_initial_data(user_datastore)
    
    app.config["WTF_CSRF_CHECK_DEFAULT"] = False
    app.config["SECURITY_CSRF_PROTECT_MECHANISMS"] = []
    app.config["SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS"] = True

    # Add CORS headers to all responses
    @app.after_request
    def add_cors_headers(response):
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response
    
    # Handle OPTIONS requests for CORS preflight
    @app.route('/', defaults={'path': ''}, methods=['OPTIONS'])
    @app.route('/<path:path>', methods=['OPTIONS'])
    def handle_options(path):
        return '', 204
    
    # Assign api globally
    create_views(app, user_datastore)
    
    return app, api

from application.api import *

if __name__ == '__main__':
    app, api = create_app()
    app.run(host='0.0.0.0', port=5000)