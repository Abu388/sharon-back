from flask import Blueprint, request, jsonify
from .models import db, Contact, Partnership  # Use a relative import
import json  # Import json to handle list serialization

bp = Blueprint('api', __name__)

@bp.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        
        contact = Contact(
            full_name=data['fullName'],
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
        return jsonify({"status": "error", "message": "Failed to process data"}), 500

@bp.route('/api/partnership', methods=['POST'])
def partnership():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        
        partnership = Partnership(
            full_name=data['fullName'],
            email=data['email'],
            phone=data.get('phone'),
            address=data.get('address'),
            country=data.get('country'),
            church=data.get('church'),
            office=data.get('office'),
            # Convert lists to JSON strings
            partner_ways=json.dumps(data.get('partnerWays', [])),  # Serialize list
            professional_support=json.dumps(data.get('professionalSupport', [])),  # Serialize list
            material_type1=data.get('materialType1'),
            material_quantity1=data.get('materialQuantity1'),
            material_type2=data.get('materialType2'),
            material_quantity2=data.get('materialQuantity2'),
            material_type3=data.get('materialType3'),
            material_quantity3=data.get('materialQuantity3'),
            message=data['message']
        )
        db.session.add(partnership)
        db.session.commit()
        
        print('Partnership Data:', data)
        return jsonify({"status": "success", "data_received": data}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error processing partnership data: {e}")
        return jsonify({"status": "error", "message": "Failed to process data"}), 500