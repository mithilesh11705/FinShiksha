import os

# Get the base directory where `config.py` is located
basedir = os.path.abspath(os.path.dirname(__file__))

class Config():
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = None
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECURITY_PASSWORD_SALT = None
    SECRET_KEY = None
    SECURITY_TOKEN_AUTHENTICATION_HEADER = None
    SECURITY_REGISTERABLE = True
    SECURITY_TRACKABLE = True
    SECURITY_JSON = True  # Enables JSON responses

class LocalDevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'
    SECURITY_PASSWORD_SALT = "salty-password"
    SECRET_KEY = os.urandom(24)
    SECURITY_TOKEN_AUTHENTICATION_HEADER = "my-unique-token"
