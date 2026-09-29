# University Research Opportunity Portal

A full-stack web application designed for university faculty to post, manage, and track student research opportunities, and for students to explore available research positions.

## Course and Assignment Information

- **Course**: Computer Networks (CN)
- **Assignment**: Assignment #01
- **Program & Section**: BS AI (Batch 5A)
- **Session**: Fall 2026
- **Institution**: National University of Computer & Emerging Sciences (NUCES - FAST), Peshawar Campus

## Tech Stack

- **Backend**: Python 3.9+, FastAPI, Uvicorn, Pydantic v2
- **Database**: MySQL (via `mysql-connector-python`), SQL Schema Script
- **Frontend**: React 19, Vite 8, Bootstrap 5.3, Vanilla CSS
- **API Testing**: Postman Collection (v2.1 JSON)
- **Version Control**: Git & GitHub

## Key Features

- **Full RESTful CRUD API**: Dedicated endpoints for creating, retrieving, updating, and deleting research opportunities.
- **Strict Data Validation**: Pydantic schemas validating non-empty string fields (with automatic whitespace trimming), positive position counts (`>= 1`), ISO-formatted deadlines, and strict enum status values (`Open` or `Closed`).
- **Standardized Error Handling**: Custom validation exception handler mapping Pydantic errors to HTTP `400 Bad Request` with field-level diagnostics.
- **Resource Cleanup**: Explicit connection closing in `finally` blocks across all database operations to prevent connection leaks.
- **Responsive Interactive Frontend**:
  - Live opportunity catalog with real-time text search and filter by research area and status.
  - Interactive cards with 3D cursor tilt effects and dynamic status indicator borders.
  - Slide-up bottom sheet modal for creating and updating opportunities with inline validation.
  - Instant status toggle switch and deletion confirmation popovers.
  - Non-blocking stacked toast notifications for user feedback.

## Project Structure

```text
research-opportunity-portal/
├── backend/
│   ├── .env                    # Environment variables (DB credentials)
│   ├── db.py                   # MySQL connection helper using python-dotenv
│   ├── main.py                 # FastAPI application routes, CORS, and exception handlers
│   ├── models.py               # Pydantic validation schemas (Create & Update)
│   ├── requirements.txt        # Python backend dependencies
│   └── schema.sql              # MySQL database and table definition
├── frontend/
│   ├── index.html              # HTML entry point
│   ├── package.json            # Node.js project manifest and scripts
│   ├── vite.config.js          # Vite configuration
│   └── src/
│       ├── App.jsx             # Main React application component
│       ├── main.jsx            # React root mount and Bootstrap/CSS imports
│       ├── index.css           # Custom styles, theme variables, and animations
│       ├── api.js              # Fetch client for opportunity resources
│       ├── opportunityApi.js   # Alternate client with ApiError handling
│       └── components/
│           ├── DetailsModal.jsx      # Detailed opportunity view modal
│           ├── OpportunityCard.jsx   # Opportunity card component
│           └── OpportunityForm.jsx   # Create/Edit opportunity form component
├── postman/
│   └── Research Opportunity Portal API.postman_collection.json
├── .gitignore                  # Git ignore rules for Python, Node, and environment files
└── README.md                   # Project documentation
```

## Prerequisites

Ensure you have the following installed on your development machine:

- **Python**: Version 3.9 or higher
- **Node.js**: Version 18.x or higher (with `npm`)
- **MySQL Server**: Version 8.0+ or XAMPP / MariaDB running locally on port 3306

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shahmeer001/research-opportunity-portal.git
cd research-opportunity-portal
```

### 2. Database Setup

1. Start your local MySQL service (e.g., start MySQL module in XAMPP or run your local MySQL server).
2. Execute the `backend/schema.sql` script to create the `research_portal` database and the `opportunities` table:

```bash
# Using MySQL Command Line (Windows / Linux / macOS)
mysql -u root -p < backend/schema.sql

# If your local MySQL has no password set (default in XAMPP):
mysql -u root -e "SOURCE backend/schema.sql;"
```

Alternatively, open `backend/schema.sql` in phpMyAdmin or MySQL Workbench and execute the script.

### 3. Backend Setup

1. Open a terminal and navigate to the `backend/` folder:

```bash
cd backend
```

2. Create and activate a Python virtual environment:

```bash
# On Windows (PowerShell):
python -m venv venv
.\venv\Scripts\Activate.ps1

# On Windows (Command Prompt):
python -m venv venv
.\venv\Scripts\activate.bat

# On macOS/Linux:
python3 -m venv venv
source venv/bin/activate
```

3. Install required Python packages:

```bash
pip install -r requirements.txt
```

4. Create an environment file named `.env` in the `backend/` directory with the following variables:

```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=research_portal
```

*(Adjust `DB_USER` and `DB_PASSWORD` if your local MySQL instance has a custom username or password).*

5. Start the FastAPI development server:

```bash
uvicorn main:app --reload
```

The backend server will run at: `http://127.0.0.1:8000`
- API documentation (Swagger UI): `http://127.0.0.1:8000/docs`
- Health check endpoint: `http://127.0.0.1:8000/health`

### 4. Frontend Setup

1. Open a second terminal and navigate to the `frontend/` folder:

```bash
cd frontend
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Start the Vite development server:

```bash
npm run dev
```

The frontend application will run at: `http://localhost:5173`

*(The backend CORS configuration already permits requests from `http://localhost:5173` and `http://127.0.0.1:5173`).*

## API Endpoints

The API is served under `/api` (with root and health diagnostic routes at `/` and `/health`):

| HTTP Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API status and documentation link | `200 OK` |
| `GET` | `/health` | Health check endpoint confirming DB connection | `200 OK`, `500 Internal Server Error` |
| `POST` | `/api/opportunities` | Creates a new research opportunity | `201 Created`, `400 Bad Request`, `500 Internal Server Error` |
| `GET` | `/api/opportunities` | Retrieves all research opportunities (newest first) | `200 OK`, `500 Internal Server Error` |
| `GET` | `/api/opportunities/{opp_id}` | Retrieves a single opportunity by its numeric ID | `200 OK`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `PUT` | `/api/opportunities/{opp_id}` | Updates an existing opportunity (supports partial updates) | `200 OK`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE` | `/api/opportunities/{opp_id}` | Deletes an opportunity by ID | `200 OK`, `404 Not Found`, `500 Internal Server Error` |

## Postman API Collection

An exported Postman collection is included in the repository at:
`postman/Research Opportunity Portal API.postman_collection.json`

### How to Use:
1. Open the Postman desktop application.
2. Click **Import** (top-left button).
3. Drag and drop `postman/Research Opportunity Portal API.postman_collection.json` or select the file.
4. Ensure the backend server is running on `http://127.0.0.1:8000`.
5. Execute the pre-configured requests to test all endpoints (GET, POST, PUT, DELETE, validation tests, and health checks).

## Demo Video

- **Video Link**: `[DEMO VIDEO LINK PLACEHOLDER]`

## Repository

- **GitHub**: [https://github.com/Shahmeer001/research-opportunity-portal](https://github.com/Shahmeer001/research-opportunity-portal)
