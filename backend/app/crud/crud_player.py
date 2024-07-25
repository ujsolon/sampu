from app.db.session import supabase
from app.schemas.player import PlayerCreate, Player
from typing import List

def create_player(player: PlayerCreate) -> Player:
    response = supabase.table("players").insert(player.dict()).execute()
    data = response.data[0]
    return Player(**data)

def get_players() -> List[Player]:
    response = supabase.table("players").select("*").execute()
    data = response.data
    return [Player(**item) for item in data]
