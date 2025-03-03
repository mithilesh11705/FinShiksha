from flask_security import Security, SQLAlchemyUserDatastore
from application.models import User, Role
from application.database import db

security = Security()
user_datastore = SQLAlchemyUserDatastore(db, User, Role)