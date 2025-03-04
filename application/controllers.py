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

        if not email or not password or role not in ['stud','staff']:
            return jsonify({"message" : "invalid input"})
        
        try:
            validate_email(email)
        except EmailNotValidError:
            return jsonify({"message" : "invalid email"})
        
        if user_datastore.find_user(email=email):
            return jsonify({"message":"User already exists"})
        
        active = False if role!='stud' else True
        try:
            new_user = User(email=email,password=hash_password(password),active=True,roles=[role])
            db.session.add(new_user)
            db.session.flush()

            if role == 'stud':
                name = data.get('name')
                roll_number = data.get('roll_number')
                grade = data.get('grade')
                section = data.get('section')
                department_id = data.get('department_id')
                new_student = Student(user_id=new_user.id,name=name,roll_number=roll_number,grade=grade,section=section,department_id=department_id)
                db.session.add(new_student)
                db.session.flush()

            elif role == 'staff':
                department_id = data.get('department_id')
                name = data.get('name')
                designation = data.get('designation')
                salary = data.get('salary')
                bank_account = data.get('bank_account')
                ifsc_code = data.get('ifsc_code')
                new_staff = Staff(user_id=new_user.id,department_id=department_id,name=name,designation=designation,salary=salary,bank_account=bank_account,ifsc_code=ifsc_code)
                db.session.add(new_staff)
                db.session.flush()
            db.session.commit()
        except:
            print('error while creating')
            db.session.rollback()
            return jsonify({"message":"error while creating user"}), 408
        
        return jsonify({"message" : "user created"}), 200

    @app.route('/add-department', methods=['POST'])
    @roles_required('admin')
    def add_department():
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        head_id = data.get('head_id')
        if not name or not description or not head_id:
            return jsonify({"message" : "invalid input"})
        try:
            new_department = Department(name=name,description=description,head_id=head_id)
            db.session.add(new_department)
            db.session.flush()
            #assign hod
            hod = User.query.filter_by(id=head_id).first()
            hod.roles = ['hod','staff']
            db.session.commit()
        except:
            print('error while creating')
            db.session.rollback()
            return jsonify({"message":"error while creating department"}), 408
        
        return jsonify({"message" : "department created"}), 200
    
    @app.route('/add-fees', methods=['POST'])
    @roles_required('admin')
    def add_fees():
        data = request.get_json()
        department_id = data.get('department_id')
        academic_year = data.get('academic_year')
        year = data.get('year')
        one_time_fees = data.get('one_time_fees')
        total_fees = data.get('total_fees')
        
        if not department_id or not academic_year or not year or not total_fees or not one_time_fees:
            return jsonify({"message":"invalid input"})
        
        try:
            distribution = {
                "tuition_fees": 0.50 * total_fees,
                "development_fees": 0.15 * total_fees,
                "exam_fees": 0.08 * total_fees,
                "library_fees": 0.05 * total_fees,
                "sports_fees": 0.05 * total_fees,
                "internet_fees": 0.05 * total_fees,
                "placement_fees": 0.05 * total_fees,
                "insurance_fees": 0.05 * total_fees,
                "convocation_fees": 0.02 * total_fees if total_fees >= 50000 else 0  # Only if total is significant
            }
            
            new_fee = Fees(department_id=department_id,academic_year=academic_year,year=year,one_time_fees=one_time_fees,total_fees=total_fees,**distribution)
            db.session.add(new_fee)
            db.session.commit()

        except:
            print('error while creating')
            db.session.rollback()
            return jsonify({"message":"error while creating fees"}), 408

        return jsonify({"message" : "fees created"}), 200

    @app.route('/add-hostel-fees', methods=['POST'])
    @roles_required('admin')
    def add_hostel_fees():
        data = request.get_json()
        department_id = data.get('department_id')
        academic_year = data.get('academic_year')
        year = data.get('year')
        total_fees = data.get('total_fees')
        
        if not department_id or not academic_year or not year or not total_fees:
            return jsonify({"message":"invalid input"})
        
        try:
            distribution = {
                "room_rent": 0.30 * total_fees,
                "electricity_charges": 0.10 * total_fees,
                "water_charges": 0.05 * total_fees,
                "recreation_fees": 0.05 * total_fees,
                "allied_services_fees": 0.05 * total_fees,
                "mess_charges": 0.30 * total_fees,
                "mess_deposit": 0.10 * total_fees,
                "hostel_caution_money": 0.05 * total_fees
            }
            new_fee = HostelFees(department_id=department_id,academic_year=academic_year,year=year,total_fees=total_fees)
            db.session.add(new_fee)
            db.session.commit()

        except:
            print('error while creating')
            db.session.rollback()
            return jsonify({"message":"error while creating fees"}), 408

        return jsonify({"message" : "fees created"}), 200

    @app.route('/fees', methods=['GET'])
    def get_fees():
        fees = Fees.query.all()
        return jsonify({"fees" : [fee.to_dict() for fee in fees]}), 200

    @app.route('/departments', methods=['GET'])
    def get_departments():
        departments = Department.query.all()
        return jsonify({"departments" : [department.to_dict() for department in departments]}), 200
    
    @app.route('/staffs',methods=['GET'])
    def get_staffs():
        staffs = Staff.query.all()
        return jsonify({"staffs" : [staff.to_dict() for staff in staffs]}), 200