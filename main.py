from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from database import Base, engine
from endpoints import videojuegos, desarrolladores
import os

# Crear instancia de FastAPI
app = FastAPI(
    title="GamingDex API",
    description="Proyecto integrador estilo retro con FastAPI + NES.css",
    version="1.0.0"
)

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(videojuegos.router, prefix="/videojuegos", tags=["Videojuegos"])
app.include_router(desarrolladores.router, prefix="/desarrolladores", tags=["Desarrolladores"])

# Servir archivos estáticos
static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Vistas HTML

@app.get("/", response_class=FileResponse)
def index():
    return FileResponse(os.path.join(static_dir, "index.html"))

@app.get("/videojuegos", response_class=FileResponse)
def ver_videojuegos():
    return FileResponse(os.path.join(static_dir, "videojuegos.html"))

# (Opcional) futuras páginas:
@app.get("/registrar", response_class=FileResponse)
def registrar():
    return FileResponse(os.path.join(static_dir, "registrar.html"))

@app.get("/buscar", response_class=FileResponse)
def buscar():
     return FileResponse(os.path.join(static_dir, "buscar.html"))

@app.get("/desarrolladores", response_class=FileResponse)
def gestionar_dev():
    return FileResponse(os.path.join(static_dir, "desarrolladores.html"))
@app.get("/documentacion", response_class=FileResponse)
def ver_documentacion():
    return FileResponse(os.path.join(static_dir, "documentacion.html"))

@app.get("/diseno", response_class=FileResponse)
def ver_diseno():
    file_path = os.path.join(static_dir, "diseno.html")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    return FileResponse(file_path)
