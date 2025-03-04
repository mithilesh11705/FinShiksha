import os
from flask import Flask
from flask_restful import Api
from application.database import db,security
from application.initial_data import create_initial_data
from application.controllers import create_views
from flask_cors import CORS
import resources

app = None

def create_app():
    app = Flask(__name__,template_folder='public')

    # configuration
    app.config['DEBUG'] = True
    app.config['SECRET_KEY'] = 'should-not-be-seen'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
    app.config['SECURITY_PASSWORD_SALT'] = 'salty-password'
    app.config['SECURITY_TOKEN_AUTHENTICATION_HEADER'] = 'Authentication-Token'

    # tell flask to use sql_alchemy db
    db.init_app(app)

    with app.app_context():
        from application.models import User, Role
        from flask_security import SQLAlchemyUserDatastore

        user_datastore = SQLAlchemyUserDatastore(db, User, Role)
        security.init_app(app, user_datastore)
        
        db.create_all()
        create_initial_data(user_datastore)

    CORS(app, supports_credentials=True)

    app.config["WTF_CSRF_CHECK_DEFAULT"] = False
    app.config['SECURITY_CSRF_PROTECT_MECHANISMS'] = []
    app.config['SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS'] = True

    # setup the view
    create_views(app,user_datastore)

    # connect flask to flask_restful

    return app

from application.api import *

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
