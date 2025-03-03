from flask_security import SQLAlchemySessionUserDatastore
from application.database import db
from flask_security.utils import hash_password

def create_initial_data(user_datastore : SQLAlchemySessionUserDatastore):
    print("creating roles and users") # for debug purposes

    # creating roles

    user_datastore.find_or_create_role(name='admin', description = "Administrator")
    user_datastore.find_or_create_role(name='staff', description = "Staff")
    user_datastore.find_or_create_role(name='stud', description = "Student")    
    user_datastore.find_or_create_role(name='hod', description = "Department Head")    


    # creating initial data

    if not user_datastore.find_user(email = "admin@iitm.ac.in"):
        user_datastore.create_user(email = "admin@iitm.ac.in", password = hash_password("pass"), roles=['admin'],active = True)
    if not user_datastore.find_user(email = "staff@iitm.ac.in"):
        user_datastore.create_user(email = "staff@iitm.ac.in", password = hash_password("pass"), roles=['staff'])
    if not user_datastore.find_user(email = "stud@iitm.ac.in"):
        user_datastore.create_user(email = "stud@iitm.ac.in", password = hash_password("pass"),active = True, roles=['stud'])
    if not user_datastore.find_user(email = "hod@iitm.ac.in"):
        user_datastore.create_user(email = "hod@iitm.ac.in", password = hash_password("pass"),active = True, roles=['hod'])
    db.session.commit()