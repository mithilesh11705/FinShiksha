from flask import request, render_template, redirect, url_for,flash,Response,jsonify
from flask_security.utils import hash_password
from flask import current_app as app
from application.models import *
from application.database import db
from flask_security import SQLAlchemyUserDatastore,current_user,auth_required,roles_required
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from email_validator import validate_email, EmailNotValidError
def create_views(app,user_datastore:SQLAlchemyUserDatastore):

    @app.route('/')
    def index():
        return render_template('index.html',current_user=current_user)
    
    @app.route('/user-info', methods=['GET'])
    @auth_required("session","token")  # Requires authentication
    def user_info():
        return jsonify({
            "email": current_user.email,
            "role": current_user.roles[0].name if current_user.roles else "user"
        }), 200
    
    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        if not email or not password or role not in ['stud','hod','staff']:
            return jsonify({"message" : "invalid input"})
        
        try:
            validate_email(email)
        except EmailNotValidError:
            return jsonify({"message" : "invalid email"})
        
        if user_datastore.find_user(email=email):
            return jsonify({"message":"User already exists"})
        
        active = False if role!='stud' else True
        try:
            user_datastore.create_user(email=email,password=hash_password(password),roles = [role],active=active)
            db.session.commit()
        except:
            print('error while creating')
            db.session.rollback()
            return jsonify({"message":"error while creating user"}), 408
        
        return jsonify({"message" : "user created"}), 200