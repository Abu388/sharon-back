import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://sah:gela@localhost/sahron'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'yabbby')  # Default to 'yabbby'
    UPLOAD_FOLDER = 'uploads/receipts'
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024  # 5MB file limit

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False