from sqlalchemy import Column, Integer, String, Float
from database import Base

class Videojuego(Base):
    __tablename__ = "videojuegos"
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    precio = Column(Float, nullable=True)
    calificacion = Column(Float, nullable=True)
