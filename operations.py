from pydantic import BaseModel

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

class VideojuegoOut(VideojuegoBase):
    id: int

    class Config:
        from_attributes = True

class DesarrolladorBase(BaseModel):
    nombre: str
    tipo: str
    pais: str | None = None
    fundacion: int | None = None

class DesarrolladorCreate(DesarrolladorBase):
    pass

class DesarrolladorUpdate(DesarrolladorBase):
    pass

class DesarrolladorOut(DesarrolladorBase):
    id: int

    class Config:
        from_attributes = True
