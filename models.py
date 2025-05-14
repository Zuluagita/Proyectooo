
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Desarrollador(Base):
    __tablename__ = "desarrolladores"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    tipo = Column(String, nullable=False)  # "Independiente" o "Corporativo"
    pais = Column(String, nullable=True)
    fundacion = Column(Integer, nullable=True)

    videojuegos = relationship("Videojuego", back_populates="desarrollador")

class Videojuego(Base):
    __tablename__ = "videojuegos"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    precio = Column(Float, nullable=True)
    calificacion = Column(Float, nullable=True)
    desarrollador_id = Column(Integer, ForeignKey("desarrolladores.id"), nullable=True)

    desarrollador = relationship("Desarrollador", back_populates="videojuegos")