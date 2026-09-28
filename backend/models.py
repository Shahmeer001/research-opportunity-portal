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