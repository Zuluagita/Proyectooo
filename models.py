from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base

class Desarrollador(Base):
    __tablename__ = "desarrolladores"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    pais = Column(String)
    tipo = Column(String)
    estado = Column(Boolean, default=True)  # ✅ Eliminación lógica

    videojuegos = relationship("Videojuego", back_populates="desarrollador")


class Videojuego(Base):
    __tablename__ = "videojuegos"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    genero = Column(String)
    precio = Column(Float)
    calificacion = Column(Float)
    desarrollador_id = Column(Integer, ForeignKey("desarrolladores.id"))
    estado = Column(Boolean, default=True)  # ✅ Eliminación lógica

    desarrollador = relationship("Desarrollador", back_populates="videojuegos")
