from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from db import get_connection
from models import OpportunityCreate

app = FastAPI(title="Research Opportunity Portal API")


# The assignment wants 400 for bad input, but FastAPI defaults to 422
@app.exception_handler(RequestValidationError)
async def validation_handler(request: Request, exc: RequestValidationError):
    errors = [
        {"field": ".".join(str(p) for p in e["loc"][1:]), "message": e["msg"]}
        for e in exc.errors()
    ]
    return JSONResponse(status_code=400, content={"detail": "Validation failed", "errors": errors})


@app.get("/")
def root():
    return {"message": "Research Opportunity Portal API is running", "docs": "/docs"}


@app.get("/health")
def health_check():
    try:
        conn = get_connection()
        conn.close()
        return {"status": "ok", "db": "connected"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}


@app.post("/api/opportunities", status_code=201)
def create_opportunity(opp: OpportunityCreate):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """INSERT INTO opportunities
               (title, description, research_area, faculty_name, department,
                required_skills, available_positions, application_deadline, status)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (opp.title, opp.description, opp.research_area, opp.faculty_name,
             opp.department, opp.required_skills, opp.available_positions,
             opp.application_deadline, opp.status),
        )
        conn.commit()
        new_id = cursor.lastrowid
        cursor.execute("SELECT * FROM opportunities WHERE id = %s", (new_id,))
        return cursor.fetchone()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")
    finally:
        if conn:
            conn.close()


@app.get("/api/opportunities")
def get_all_opportunities():
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM opportunities ORDER BY id DESC")
        return cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")
    finally:
        if conn:
            conn.close()


@app.get("/api/opportunities/{opp_id}")
def get_opportunity(opp_id: int):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM opportunities WHERE id = %s", (opp_id,))
        row = cursor.fetchone()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")
    finally:
        if conn:
            conn.close()

    if row is None:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return row