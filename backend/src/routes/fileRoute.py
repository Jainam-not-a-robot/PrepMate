from fastapi import APIRouter,File,UploadFile
from ..controllers.fileToChecklist import upload_file,checklist_access
from pathlib import Path
fileRouter=APIRouter()

@fileRouter.post("/uploadFiles/")
async def handle_upload(file:UploadFile = File(...)):
    return await upload_file(file)

@fileRouter.get("/checklist")
async def checklistMaker(filename:str):
    BASE_DIR = Path(__file__).resolve().parent
    # UPLOAD_DIR = BASE_DIR / "uploads"
    # UPLOAD_DIR.mkdir(exist_ok=True) 
    filename = Path(filename).name
    file_path=str("/home/jainam/Documents/projects/PrepMate/backend/jainam_resume.pdf")

    return await checklist_access(file_path)