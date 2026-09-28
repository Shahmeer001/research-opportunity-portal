from fastapi import FastAPI
from db import get_connection

app = FastAPI(title="Research Opportunity Portal API")

@app.get("/health")
def health_check():
    try:
        conn = get_connection()
        conn.close()
        return {"status": "ok", "db": "connected"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}