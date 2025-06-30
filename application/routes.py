from flask import Blueprint, request, jsonify, current_app
from .models import db, Contact, Partnership, Donation
import json
import os
from werkzeug.utils import secure_filename

bp = Blueprint('api', __name__)

@bp.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        
        contact = Contact(
            full_name=data['fullName'],  # Change key to match the request body
            email=data['email'],
            subject=data.get('subject'),
            message=data['message']
        )
        db.session.add(contact)
        db.session.commit()
        
        print('Contact Data:', data)
        return jsonify({'status': 'success', 'data_received': data}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error processing contact data: {e}")
        return jsonify({"status": "error", "message": "Failed to process data", "error": str(e)}), 500

@bp.route('/api/partnership', methods=['POST'])
def partnership():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        
        partnership = Partnership(
            full_name=data['fullName'],  # Change key to match the request body
            email=data['email'],
            phone=data.get('phone'),
            address=data.get('address'),
            country=data.get('country'),
            church=data.get('church'),
            office=data.get('office'),
            partner_ways=json.dumps(data.get('partnerWays', [])),
            professional_support=json.dumps(data.get('professionalSupport', [])),
        )
        db.session.add(partnership)
        db.session.commit()
        
        print('Partnership Data:', data)
        return jsonify({"status": "success", "data_received": data}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error processing partnership data: {e}")
        return jsonify({"status": "error", "message": "Failed to process data", "error": str(e)}), 500

@bp.route('/api/donate', methods=['POST'])
def handle_donation():
    try:
        if request.content_type == 'application/json':
            data = request.get_json()
            files = {}
        else:
            data = request.form.to_dict()
            files = request.files

        if not data.get('fullName') or not data.get('email'):  # Consistent key names
            return jsonify({"status": "error", "message": "Full name and email are required"}), 400

        receipt_filename = None
        if 'receipt' in files and data.get('paymentMethod') == 'bank_transfer':
            receipt = files['receipt']
            if receipt:
                upload_folder = os.path.join(current_app.root_path, 'uploads/receipts')
                os.makedirs(upload_folder, exist_ok=True)
                filename = secure_filename(receipt.filename)
                receipt_path = os.path.join(upload_folder, filename)
                receipt.save(receipt_path)
                receipt_filename = filename

        donation = Donation(
            full_name=data['fullName'],  # Change key to match the request body
            email=data['email'],
            phone_number=data.get('phoneNumber'),
            address=data.get('address'),
            donation_type=data['donationType'],
            amount=float(data.get('amount', 0)) if data.get('donationType') == 'money' else None,
            frequency=data.get('frequency'),
            payment_method=data.get('paymentMethod'),
            receipt_filename=receipt_filename,
            materials=json.dumps(data.get('materials', [])),
            message=data.get('message'),
        )

        db.session.add(donation)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Donation recorded successfully",
            "donation_id": donation.id
        }), 201

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Donation error: {str(e)}")
        return jsonify({"status": "error", "message": "Failed to process donation", "error": str(e)}), 500