from app import create_app

app = create_app()

# Create tables if they don't exist
with app.app_context():
    from app.models import db  # Ensure this import is correct
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)