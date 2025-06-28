from application import create_app

app = create_app()

# Create tables if they don't exist
with app.app_context():
    from application.models import db
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
print("Tables created successfully!")