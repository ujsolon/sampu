from pydantic import BaseModel
from typing import Optional

class Court(BaseModel):
    id: Optional[int] = None
    name: str
    location: str
    owner_id: int

class CourtCreate(BaseModel):
    name: str
    location: str
    owner_id: int

class CourtUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    owner_id: Optional[int] = None
