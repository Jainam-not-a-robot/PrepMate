from fastapi import APIRouter,File,UploadFile,Depends
from sqlalchemy.orm import Session
from ..controllers.fileToChecklist import upload_file,checklist_access,quiz_generate,read_notes,makeChecklist
from pathlib import Path
import json
from ..db.database import get_db
fileRouter=APIRouter()

@fileRouter.post("/uploadFiles/")
async def handle_upload(file:UploadFile = File(...),db:Session=Depends(get_db)):
    return await upload_file(file,db)

@fileRouter.get("/ocr_notes")
async def getting_notes(file_name:str):
    return await read_notes(file_name)

@fileRouter.post("/checklist")
async def checklistMaker(filename:str,db:Session=Depends(get_db)):
    BASE_DIR = Path(__file__).resolve().parent.parent.parent/"uploads"
    filename = Path(filename).name
    file_path=str(BASE_DIR/filename)
    notes=await read_notes(file_path)
    return await makeChecklist(file_path,notes,db)

@fileRouter.get("/quiz")
async def quizGenerator(filename:str,difficulty:str,num_of_questions:int):
    BASE_DIR = Path(__file__).resolve().parent.parent.parent/"uploads"
    filename = Path(filename).name
    print(BASE_DIR)
    file_path=str(BASE_DIR/filename)
    print(file_path)
    # file_path="/home/jainam/Documents/projects/PrepMate/backend/uploads/l4.pdf"
    ocr_notes=await read_notes(file_path)
    quiz=await quiz_generate(file_path,ocr_notes,difficulty,num_of_questions)
    return json.loads(quiz)

