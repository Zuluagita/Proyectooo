from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import Videojuego
from operations import VideojuegoCreate, VideojuegoUpdate, VideojuegoOut

router = APIRouter()

@router.post("/", response_model=VideojuegoOut, status_code=201)
def crear_videojuego(data: VideojuegoCreate, db: Session = Depends(get_db)):
    nuevo = Videojuego(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.get("/", response_model=list[VideojuegoOut])
def listar_videojuegos(
    titulo: str | None = Query(None),
    genero: str | None = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Videojuego).options(joinedload(Videojuego.desarrollador))
    if titulo:
        query = query.filter(Videojuego.titulo.ilike(f"%{titulo}%"))
    if genero:
        query = query.filter(Videojuego.genero.ilike(f"%{genero}%"))
    return query.all()

@router.get("/{videojuego_id}", response_model=VideojuegoOut)
def obtener_videojuego(videojuego_id: int, db: Session = Depends(get_db)):
    juego = db.query(Videojuego).options(joinedload(Videojuego.desarrollador)).get(videojuego_id)
    if not juego:
        raise HTTPException(status_code=404, detail="Videojuego no encontrado")
    return juego

@router.put("/{videojuego_id}", response_model=VideojuegoOut)
def actualizar_videojuego(videojuego_id: int, data: VideojuegoUpdate, db: Session = Depends(get_db)):
    juego = db.query(Videojuego).get(videojuego_id)
    if not juego:
        raise HTTPException(status_code=404, detail="Videojuego no encontrado")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(juego, key, value)
    db.commit()
    db.refresh(juego)
    return juego

@router.delete("/{videojuego_id}", status_code=204)
def eliminar_videojuego(videojuego_id: int, db: Session = Depends(get_db)):
    juego = db.query(Videojuego).get(videojuego_id)
    if not juego:
        raise HTTPException(status_code=404, detail="Videojuego no encontrado")
    db.delete(juego)
    db.commit()
