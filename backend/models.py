from datetime import date
from typing import Optional
from sqlalchemy import Column, Integer, String, Text, Date
from pydantic import BaseModel, ConfigDict

from db import Base


# ==========================================
# SQLAlchemy Models (Database Tables)
# ==========================================

class OpportunityModel(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    research_area = Column(String(100), nullable=False)
    faculty_name = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    required_skills = Column(String(255), nullable=True)
    available_positions = Column(Integer, nullable=False)
    application_deadline = Column(Date, nullable=False)
    status = Column(String(20), default="Open")


# ==========================================
# Pydantic Schemas (API Data Contracts)
# ==========================================

class OpportunityBase(BaseModel):
    title: str
    description: str
    research_area: str
    faculty_name: str
    department: str
    required_skills: Optional[str] = None
    available_positions: int
    application_deadline: date
    status: Optional[str] = "Open"


class OpportunityCreate(OpportunityBase):
    pass


class OpportunityResponse(OpportunityBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
