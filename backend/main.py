from fastapi import FastAPI
from src.routes.fileRoute import fileRouter
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

origins = [
    "http://localhost:3000  ", 
]

# Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # list of allowed origins
    allow_credentials=True,         # allow cookies / auth headers
    allow_methods=["*"],            # allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],            # allow all headers (like Authorization)
)
app.include_router(fileRouter,prefix="/files")