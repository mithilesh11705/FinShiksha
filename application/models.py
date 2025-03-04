from application.database import db
from flask_security import UserMixin, RoleMixin
from flask_security.models import fsqla_v3 as fsqla

fsqla.FsModels.set_db_info(db)

# Association Table for Many-to-Many Relationship (User <-> Role)
class UserRoles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))

# User Table (Admin, Staff, Students, Parents)
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String)
    active = db.Column(db.Boolean)
    fs_uniquifier = db.Column(db.String(65), unique=True, nullable=False)
    roles = db.relationship('Role', secondary='user_roles')

# Role Table (Admin, Staff, Student, Parent, Sub-Admin)
class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

# Department Table (CSE, ECE, etc.)
class Department(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    head_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # HOD or Sub-Admin
    head = db.relationship('User', foreign_keys=[head_id])  # Linking to User Table

# Student Table
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    roll_number = db.Column(db.String, unique=True, nullable=False)
    grade = db.Column(db.String, nullable=False)
    section = db.Column(db.String, nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)
    status = db.Column(db.Enum("Active", "Inactive", "Graduated"), default="Active", nullable=False)

    user = db.relationship('User', foreign_keys=[user_id])  # Student Profile
    department = db.relationship('Department')  # Student's Academic Department

# Staff Table
class Staff(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)
    designation = db.Column(db.String(100), nullable=False)  # Role like Teacher, Accountant, Clerk
    salary = db.Column(db.Numeric(10, 2), nullable=False)  # Monthly Salary
    bank_account = db.Column(db.String(50), nullable=False)  # Bank Account Number
    ifsc_code = db.Column(db.String(20), nullable=False)  # Bank IFSC Code
    status = db.Column(db.Enum("Active", "Inactive", "Retired"), default="Active", nullable=False)
    last_paid = db.Column(db.Date, nullable=True)  # Last Salary Payment Date

    user = db.relationship('User', foreign_keys=[user_id])  # Staff Profile
    department = db.relationship('Department')  # Staff's Academic Department

class Fees(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)
    academic_year = db.Column(db.String(10), nullable=False)  # e.g., "2024-25"
    year = db.Column(db.Enum("1st", "2nd", "3rd", "4th"), nullable=False)
    tuition_fees = db.Column(db.Numeric(10, 2), nullable=False)
    development_fees = db.Column(db.Numeric(10, 2), nullable=False)
    exam_fees = db.Column(db.Numeric(10, 2), nullable=False)
    library_fees = db.Column(db.Numeric(10, 2), nullable=False)
    sports_fees = db.Column(db.Numeric(10, 2), nullable=False)
    internet_fees = db.Column(db.Numeric(10, 2), nullable=False)
    placement_fees = db.Column(db.Numeric(10, 2), nullable=False)
    insurance_fees = db.Column(db.Numeric(10, 2), nullable=False)
    convocation_fees = db.Column(db.Numeric(10, 2), nullable=True)
    total_fees = db.Column(db.Numeric(10, 2), nullable=False)
    one_time_fees = db.Column(db.Numeric(10, 2), nullable=True)

    department = db.relationship('Department')

class HostelFees(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_rent = db.Column(db.Numeric(10, 2), nullable=True)
    electricity_charges = db.Column(db.Numeric(10, 2), nullable=True)
    water_charges = db.Column(db.Numeric(10, 2), nullable=True)
    recreation_fees = db.Column(db.Numeric(10, 2), nullable=True)
    allied_services_fees = db.Column(db.Numeric(10, 2), nullable=True)
    mess_charges = db.Column(db.Numeric(10, 2), nullable=True)
    mess_deposit = db.Column(db.Numeric(10, 2), nullable=True)
    hostel_caution_money = db.Column(db.Numeric(10, 2), nullable=True)
    total_fees = db.Column(db.Numeric(10, 2), nullable=True)
