from app.db.session import supabase
from app.schemas.court import Court, CourtCreate, CourtUpdate
from typing import List

def create_court(court: CourtCreate):
    response = supabase.table("courts").insert(court.dict()).execute()
    return response.data

def get_courts() -> List[Court]:
    response = supabase.table("courts").select("*").execute()
    return response.data

def get_court(court_id: int):
    response = supabase.table("courts").select("*").eq("id", court_id).execute()
    return response.data

def update_court(court_id: int, court: CourtUpdate):
    response = supabase.table("courts").update(court.dict(exclude_unset=True)).eq("id", court_id).execute()
    return response.data

def delete_court(court_id: int):
    response = supabase.table("courts").delete().eq("id", court_id).execute()
    return response.data
