from fastapi import FastAPI
from app.api.endpoints import players, courts#, reservations, payments

app = FastAPI()

app.include_router(players.router, prefix="/players", tags=["players"])
app.include_router(courts.router, prefix="/courts", tags=["courts"])
#app.include_router(reservations.router, prefix="/reservations", tags=["reservations"])
#app.include_router(payments.router, prefix="/payments", tags=["payments"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Sampu"}
