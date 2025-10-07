from fastapi import FastAPI
from src.routes.fileRoute import fileRouter

app=FastAPI()
app.include_router(fileRouter,prefix="/files")