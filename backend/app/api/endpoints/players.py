from fastapi import APIRouter, HTTPException
from typing import List

from app.schemas.player import Player, PlayerCreate
from app.crud import crud_player

router = APIRouter()

@router.post("/", response_model=Player)
def create_player(player: PlayerCreate):
    return crud_player.create_player(player)

@router.get("/", response_model=List[Player])
def read_players():
    return crud_player.get_players()
