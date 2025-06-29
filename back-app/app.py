from application import create_app
from flask_cors import CORS

app = create_app()
CORS(app)

# Create tables if they don't exist
with app.app_context():
    from application.models import db
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)