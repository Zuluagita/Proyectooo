from pydantic import BaseModel

# ----- MODELO VIDEOJUEGO -----
class VideojuegoBase(BaseModel):
    titulo: str
    genero: str | None = None
    precio: float | None = None
    calificacion: float | None = None
    desarrollador_id: int | None = None

class VideojuegoCreate(VideojuegoBase):
    pass

class VideojuegoUpdate(VideojuegoBase):
    pass

# 👇 Se agrega desarrollador anidado para que se incluya el nombre
class DesarrolladorOut(BaseModel):
    id: int
    nombre: str
    tipo: str
    pais: str | None = None
    fundacion: int | None = None
    estado: bool  # ✅ Se incluye el campo 'estado'

    class Config:
        from_attributes = True

class VideojuegoOut(VideojuegoBase):
    id: int
    desarrollador: DesarrolladorOut | None = None
    estado: bool  # ✅ Para poder filtrar videojuegos activos/inactivos

    class Config:
        from_attributes = True

# ----- MODELO DESARROLLADOR -----
class DesarrolladorBase(BaseModel):
    nombre: str
    tipo: str
    pais: str | None = None
    fundacion: int | None = None

class DesarrolladorCreate(DesarrolladorBase):
    pass

class DesarrolladorUpdate(DesarrolladorBase):
    pass
