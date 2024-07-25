from pydantic import BaseModel
from typing import Optional

class Player(BaseModel):
    id: Optional[int] = None
    name: str
    skill_level: str
    location: str

class PlayerCreate(BaseModel):
    name: str
    skill_level: str
    location: str

class PlayerUpdate(BaseModel):
    name: Optional[str] = None
    skill_level: Optional[str] = None
    location: Optional[str] = None
