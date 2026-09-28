# Research Opportunity Portal

A web application designed to connect undergraduate and graduate students with university research positions, faculty labs, and academic projects.

---

## 📁 Directory Structure

```text
research-opportunity-portal/
├── backend/
│   ├── main.py           # FastAPI application entry point & API endpoints
│   ├── db.py             # Database engine & session management
│   ├── models.py         # SQLAlchemy database models & Pydantic schemas
│   ├── requirements.txt  # Python package dependencies
│   └── schema.sql        # Raw SQL schema definition
├── frontend/             # Frontend application (Scheduled for Day 2)
├── .gitignore            # Git ignore configuration
└── README.md             # Project documentation
```

---

## 🚀 Getting Started (Backend)

### 1. Prerequisites

- Python 3.9+ installed on your system.

### 2. Setup Virtual Environment

```bash
cd backend
python -m venv venv

# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Development Server

```bash
uvicorn main:app --reload
```

The API will be running locally at `http://127.0.0.1:8000`.

- **Interactive API Documentation (Swagger UI)**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Alternative Documentation (ReDoc)**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 🗺️ Roadmap

- **Day 1**: Project structure setup, database modeling, schema design, and core REST API endpoints.
- **Day 2**: Frontend interface development (React / Next.js / HTML+JS UI), integration with REST API.
