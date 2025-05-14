from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from endpoints import videojuegos, desarrolladores

app = FastAPI(
    title="API de Videojuegos",
    description="CRUD completo con desarrolladores y conexión a Supabase usando FastAPI",
    version="2.0.0"
)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(videojuegos.router, prefix="/videojuegos", tags=["Videojuegos"])
app.include_router(desarrolladores.router, prefix="/desarrolladores", tags=["Desarrolladores"])
