from application import create_app
import os

app = create_app()

# Create tables if they don't exist
with app.app_context():
    from application.models import db
    db.create_all()

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Use Render's PORT or default 5000
    app.run(host="0.0.0.0", port=port, debug=True)

print("Tables created successfully!")
