from datetime import date
from typing import Literal, Optional
from pydantic import BaseModel, Field


class OpportunityCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    research_area: str = Field(..., min_length=1, max_length=100)
    faculty_name: str = Field(..., min_length=1, max_length=100)
    department: str = Field(..., min_length=1, max_length=100)
    required_skills: Optional[str] = Field(None, max_length=255)
    available_positions: int = Field(..., ge=1)
    application_deadline: date
    status: Literal["Open", "Closed"] = "Open"

class OpportunityUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, min_length=1)
    research_area: Optional[str] = Field(None, min_length=1, max_length=100)
    faculty_name: Optional[str] = Field(None, min_length=1, max_length=100)
    department: Optional[str] = Field(None, min_length=1, max_length=100)
    required_skills: Optional[str] = Field(None, max_length=255)
    available_positions: Optional[int] = Field(None, ge=1)
    application_deadline: Optional[date] = None
    status: Optional[Literal["Open", "Closed"]] = None