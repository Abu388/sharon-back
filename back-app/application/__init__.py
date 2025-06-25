from flask import Flask
from flask_cors import CORS
from .models import db
from .routes import bp as api_bp
from .config import Config
from dotenv import load_dotenv
import os

def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)
    CORS(app)

    # Load environment variables from .env file
    load_dotenv()

    # Load configuration based on environment
    app.config.from_object(Config)

    # Initialize the database
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(api_bp)

    return app