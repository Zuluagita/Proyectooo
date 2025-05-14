from fastapi import FastAPI
from database import engine, Base
from endpoints import videojuegos

app = FastAPI()

# Crear las tablas en la base de datos al iniciar
Base.metadata.create_all(bind=engine)

# Incluir los endpoints
app.include_router(videojuegos.router, prefix="/videojuegos", tags=["Videojuegos"])
