import os
from flask import Flask
from flask_restful import Api
<<<<<<< HEAD
from flask_cors import CORS  # Import CORS
from application.config import LocalDevelopmentConfig
from application.security import security, user_datastore
from application.database import db
=======
from application.database import db,security
>>>>>>> be99c08a372dc10aa9a14f463c4e9450c1e35130
from application.initial_data import create_initial_data
from application.controllers import create_views
from flask_cors import CORS
import resources

app = None

def create_app():
<<<<<<< HEAD
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
    
=======
    app = Flask(__name__,template_folder='public')

    # configuration
    app.config['DEBUG'] = True
    app.config['SECRET_KEY'] = 'should-not-be-seen'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
    app.config['SECURITY_PASSWORD_SALT'] = 'salty-password'
    app.config['SECURITY_TOKEN_AUTHENTICATION_HEADER'] = 'Authentication-Token'

    # tell flask to use sql_alchemy db
>>>>>>> be99c08a372dc10aa9a14f463c4e9450c1e35130
    db.init_app(app)

    with app.app_context():
        from application.models import User, Role
        from flask_security import SQLAlchemyUserDatastore

        user_datastore = SQLAlchemyUserDatastore(db, User, Role)
        security.init_app(app, user_datastore)
        
        db.create_all()
        create_initial_data(user_datastore)
<<<<<<< HEAD
    
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
=======

    CORS(app, supports_credentials=True)

    app.config["WTF_CSRF_CHECK_DEFAULT"] = False
    app.config['SECURITY_CSRF_PROTECT_MECHANISMS'] = []
    app.config['SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS'] = True

    # setup the view
    create_views(app,user_datastore)

    # connect flask to flask_restful

    return app
>>>>>>> be99c08a372dc10aa9a14f463c4e9450c1e35130

from application.api import *

if __name__ == '__main__':
<<<<<<< HEAD
    app, api = create_app()
    app.run(host='0.0.0.0', port=5000)
=======
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
>>>>>>> be99c08a372dc10aa9a14f463c4e9450c1e35130
