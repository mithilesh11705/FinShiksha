from sqlalchemy.ext.declarative import declarative_base
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security
engine = None
Base = declarative_base()
db = SQLAlchemy()
security = Security()