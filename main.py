from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from endpoints import videojuegos

app = FastAPI(
    title="API de Videojuegos",
    description="CRUD completo con conexión a Supabase usando FastAPI",
    version="1.0.0"
)

# Crear tablas si no existen (solo se ejecuta al levantar)
Base.metadata.create_all(bind=engine)

# CORS – Permitir acceso desde cualquier frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción puedes restringir esto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(videojuegos.router, prefix="/videojuegos", tags=["Videojuegos"])
