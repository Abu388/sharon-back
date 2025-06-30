# Backend Overview

## Project Description
This project is a Flask-based backend application designed to handle contact and partnership data submissions. It utilizes a MariaDB database to store relevant information and provides RESTful API endpoints for client interaction.

## Features
- **Contact Form Submission**: Users can submit their contact information, including name, email, subject, and message.
- **Partnership Form Submission**: Users can submit partnership requests with details such as name, email, phone number, address, country, church, office, partner ways, professional support, materials, and message.
- **Data Storage**: All submitted data is stored in a MariaDB database with two main tables: `contacts` and `partnerships`.

## Backend Setup
1. **Flask Framework**: The application is built using Flask, a lightweight WSGI web application framework.
2. **Database**: MariaDB is used to manage and store data. The following tables are implemented:
   - `contacts`: Stores user contact submissions.
   - `partnerships`: Stores partnership requests.

## API Endpoints
- **POST /api/contact**: Accepts JSON data for contact submissions.
- **POST /api/partnership**: Accepts JSON data for partnership submissions.

## Data Handling
- Incoming data is validated and processed to ensure proper formatting.
- List-type fields (like partner ways and professional support) are serialized into JSON strings before being stored in the database.

## Installation
To set up the backend:
1. Clone the repository.
2. Create a virtual environment and activate it.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt