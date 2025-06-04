from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Desarrollador
from operations import DesarrolladorCreate, DesarrolladorUpdate, DesarrolladorOut

router = APIRouter()

@router.post("/", response_model=DesarrolladorOut, status_code=201)
def crear_desarrollador(data: DesarrolladorCreate, db: Session = Depends(get_db)):
    nuevo = Desarrollador(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.get("/inactivos", response_model=list[DesarrolladorOut])
def listar_inactivos(db: Session = Depends(get_db)):
    return db.query(Desarrollador).filter(Desarrollador.estado == False).all()

@router.get("/", response_model=list[DesarrolladorOut])
def listar_desarrolladores(db: Session = Depends(get_db)):
    return db.query(Desarrollador).filter(Desarrollador.estado == True).all()

@router.get("/{desarrollador_id}", response_model=DesarrolladorOut)
def obtener_desarrollador(desarrollador_id: int, db: Session = Depends(get_db)):
    dev = db.query(Desarrollador).get(desarrollador_id)
    if not dev or not dev.estado:
        raise HTTPException(status_code=404, detail="Desarrollador no encontrado")
    return dev

@router.put("/{desarrollador_id}", response_model=DesarrolladorOut)
def actualizar_desarrollador(desarrollador_id: int, data: DesarrolladorUpdate, db: Session = Depends(get_db)):
    dev = db.query(Desarrollador).get(desarrollador_id)
    if not dev or not dev.estado:
        raise HTTPException(status_code=404, detail="Desarrollador no encontrado")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(dev, key, value)
    db.commit()
    db.refresh(dev)
    return dev

@router.delete("/{desarrollador_id}", status_code=204)
def eliminar_desarrollador(desarrollador_id: int, db: Session = Depends(get_db)):
    dev = db.query(Desarrollador).get(desarrollador_id)
    if not dev or not dev.estado:
        raise HTTPException(status_code=404, detail="Desarrollador no encontrado")
    dev.estado = False
    db.commit()

@router.patch("/{desarrollador_id}/activar")
def activar_desarrollador(desarrollador_id: int, db: Session = Depends(get_db)):
    dev = db.query(Desarrollador).get(desarrollador_id)
    if not dev:
        raise HTTPException(status_code=404, detail="Desarrollador no encontrado")
    dev.estado = True
    db.commit()
    return {"mensaje": "Desarrollador activado correctamente"}
