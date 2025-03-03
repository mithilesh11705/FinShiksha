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
    guardian_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    status = db.Column(db.Enum("Active", "Inactive", "Graduated"), default="Active", nullable=False)

    user = db.relationship('User', foreign_keys=[user_id])  # Student Profile
    guardian = db.relationship('User', foreign_keys=[guardian_id])  # Parent Profile
    department = db.relationship('Department')  # Student's Academic Department

# Parent Table (Optional, if you want a separate model for additional parent details)
class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    phone = db.Column(db.String(15), nullable=True)
    address = db.Column(db.Text, nullable=True)
    ward_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=True)
    user = db.relationship('User', foreign_keys=[user_id])  # Link to User Table
