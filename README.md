# AIOps Reliability Twin Platform

This project is a modularized version of the AIOps Reliability Twin Platform, with a React frontend and a Flask backend.

## Setup and Run

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Run the Flask application:
    ```bash
    python app.py
    ```
    The backend will be running on `http://localhost:5000`.

### Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the Node.js dependencies:
    ```bash
    npm install
    ```
3.  Run the React application:
    ```bash
    npm start
    ```
    The frontend will be running on `http://localhost:3000` and will proxy API requests to the backend.

## Project Structure

*   `backend/`: Contains the Flask backend application.
    *   `app.py`: The main Flask application file with API endpoints.
    *   `requirements.txt`: Python dependencies.
*   `frontend/`: Contains the React frontend application.
    *   `public/`: Public assets for the React app.
    *   `src/`: Source code for the React app.
        *   `components/`: Reusable React components.
        *   `App.js`: The main application component.
        *   `App.css`: Styles for the application.
*   `README.md`: This file.
