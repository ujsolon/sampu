from pydantic import BaseModel

class PlayerBase(BaseModel):
    name: str
    email: str

class PlayerCreate(PlayerBase):
    pass

class Player(PlayerBase):
    id: int

    class Config:
        from_attributes = True
