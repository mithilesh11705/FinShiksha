import os
from flask import Flask
from flask_restful import Api
from application.config import LocalDevelopmentConfig
from application.security import security, user_datastore
from application.database import db
from application.initial_data import create_initial_data
from application.controllers import create_views

app = None
api = None

def create_app():
    global app, api  # Ensure global variables are modified
    app = Flask(__name__, template_folder="templates")
    
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
  # Assign api globally
    create_views(app,user_datastore)

    return app, api

from application.api import *

if __name__ == '__main__':
    app, api = create_app()
    app.run(host='0.0.0.0', port=5000)
