# models.py

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Contact(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    subject = db.Column(db.String(255))
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Partnership(db.Model):
    __tablename__ = 'partnerships'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(50))
    address = db.Column(db.String(255))
    country = db.Column(db.String(100))
    church = db.Column(db.String(100))
    office = db.Column(db.String(100))
    partner_ways = db.Column(db.Text)
    professional_support = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Donation(db.Model):  # <-- Now properly at module level
    __tablename__ = 'donations'
    id = db.Column(db.Integer, primary_key=True)
    # Donor Information
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20))
    address = db.Column(db.String(200))
    
    # Donation Details
    donation_type = db.Column(db.String(20), nullable=False)  # 'money' or 'material'
    amount = db.Column(db.Float)
    frequency = db.Column(db.String(20))  # 'one-time' or 'recurring'
    payment_method = db.Column(db.String(20))  # 'credit_card', 'bank_transfer', etc.
    receipt_filename = db.Column(db.String(100))
    
    # Material Donations
    materials = db.Column(db.Text)
    message = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)