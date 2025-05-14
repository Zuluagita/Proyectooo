from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Videojuego
from operations import VideojuegoCreate, VideojuegoOut

router = APIRouter()

@router.post("/", response_model=VideojuegoOut)
def crear_videojuego(videojuego: VideojuegoCreate, db: Session = Depends(get_db)):
    nuevo = Videojuego(**videojuego.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.get("/", response_model=list[VideojuegoOut])
def listar_videojuegos(db: Session = Depends(get_db)):
    return db.query(Videojuego).all()
