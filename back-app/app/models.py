# models.py

from flask_sqlalchemy import SQLAlchemy

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