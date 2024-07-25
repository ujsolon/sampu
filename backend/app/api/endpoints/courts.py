from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.schemas.court import Court, CourtCreate, CourtUpdate
from app.crud import crud_court

router = APIRouter()

@router.post("/", response_model=Court)
def create_court(court: CourtCreate):
    return crud_court.create_court(court)

@router.get("/", response_model=List[Court])
def read_courts():
    return crud_court.get_courts()

@router.get("/{court_id}", response_model=Court)
def read_court(court_id: int):
    court = crud_court.get_court(court_id)
    if not court:
        raise HTTPException(status_code=404, detail="Court not found")
    return court

@router.put("/{court_id}", response_model=Court)
def update_court(court_id: int, court: CourtUpdate):
    return crud_court.update_court(court_id, court)

@router.delete("/{court_id}", response_model=Court)
def delete_court(court_id: int):
    return crud_court.delete_court(court_id)
