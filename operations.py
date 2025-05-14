from pydantic import BaseModel

class VideojuegoBase(BaseModel):
    titulo: str
    genero: str | None = None
    precio: float | None = None
    calificacion: float | None = None

class VideojuegoCreate(VideojuegoBase):
    pass

class VideojuegoOut(VideojuegoBase):
    id: int

    class Config:
        orm_mode = True
