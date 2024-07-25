from pydantic import BaseModel

class CourtBase(BaseModel):
    name: str
    location: str

class CourtCreate(CourtBase):
    pass

class CourtUpdate(CourtBase):
    pass

class Court(CourtBase):
    id: int

    class Config:
        from_attributes = True
