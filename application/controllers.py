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
from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect(app)

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
    
    from flask import request, jsonify

    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()

        # Extract common user fields
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')  # Must be 'stud' or 'staff'
        
        if not email or not password or role not in ['stud', 'staff']:
            return jsonify({"message": "Invalid input"}), 400

        # Validate email format
        try:
            validate_email(email)
        except EmailNotValidError:
            return jsonify({"message": "Invalid email"}), 400

        # Check if user already exists
        if user_datastore.find_user(email=email):
            return jsonify({"message": "User already exists"}), 409
        print(role)
        active = (role == 'stud')  # Students are active by default, staff needs approval

        try:
            # Create User
            user_datastore.create_user(email=email, password=hash_password(password), active=active)
            db.session.flush()  # Get new_user.id before committing
            new_user = User.query.filter_by(email=email).first()
            # Assign role
            role_obj = Role.query.filter_by(name="stud" if role == "stud" else "staff").first()
            if not role_obj:
                return jsonify({"message": "Role does not exist"}), 400
            new_user.roles.append(role_obj)

            # Create Student or Staff entry
            if role == 'stud':
                new_student = Student(
                    user_id=new_user.id,
                    name=data.get('name'),
                    roll_number=data.get('roll_number'),
                    grade=data.get('grade'),
                    section=data.get('section'),
                    department_id=data.get('department_id'),
                    opted_hostel=data.get('opted_hostel', False)
                )
                db.session.add(new_student)

            elif role == 'staff':
                new_staff = Staff(
                    user_id=new_user.id,
                    name=data.get('name'),
                    department_id=data.get('department_id'),
                    designation=data.get('designation'),
                    salary=data.get('salary'),
                    bank_account=data.get('bank_account'),
                    ifsc_code=data.get('ifsc_code'),
                    status="Inactive"  # Staff is inactive until approved
                )
                db.session.add(new_staff)

            db.session.commit()
            return jsonify({"message": "User created successfully"}), 201

        except Exception as e:
            db.session.rollback()
            print(f"Error while creating user: {str(e)}")  # Debugging error log
            return jsonify({"message": "Error while creating user"}), 500

    @app.route('/add-department', methods=['POST'])
    @roles_required('admin')
    @auth_required("session")
    @csrf.exempt
    def add_department():
        if not current_user.is_authenticated:
            return jsonify({"message": "Unauthorized"}), 403
        
        print(f"Authenticated User: {current_user.email}")  # Debugging print
        
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        
        if not name or not description:
            return jsonify({"message": "Invalid input"}), 400
        
        try:
            head_id = 4  # Default HOD (modify logic as needed)
            new_department = Department(name=name, description=description)
            db.session.add(new_department)
            
            # Assign HOD
            hod = User.query.filter_by(id=head_id).first()
            if hod:
                hod_role = Role.query.filter_by(name="hod").first()
                staff_role = Role.query.filter_by(name="staff").first()
                if hod_role and staff_role:
                    hod.roles.append(hod_role)
                    hod.roles.append(staff_role)
            
            db.session.commit()
        except Exception as e:
            print(f"Error while creating: {str(e)}")
            db.session.rollback()
            return jsonify({"message": "Error while creating department"}), 500
        
        return jsonify({"message": "Department created successfully"}), 200

    
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
