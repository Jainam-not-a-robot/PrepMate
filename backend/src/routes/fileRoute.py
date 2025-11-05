from fastapi import APIRouter,File,UploadFile
from ..controllers.fileToChecklist import upload_file,checklist_access,quiz_generate,read_notes
from pathlib import Path
import json
fileRouter=APIRouter()

@fileRouter.post("/uploadFiles/")
async def handle_upload(file:UploadFile = File(...)):
    return await upload_file(file)

@fileRouter.get("/ocr_notes")
async def getting_notes(file_name:str):
    return await read_notes(file_name)

@fileRouter.get("/checklist")
async def checklistMaker(filename:str):
    BASE_DIR = Path(__file__).resolve().parent.parent.parent
    # UPLOAD_DIR = BASE_DIR / "uploads"
    # UPLOAD_DIR.mkdir(exist_ok=True) 
    filename = Path(filename).name
    file_path=str(BASE_DIR/filename)
    notes=await read_notes(filename)
    # print(BASE_DIR,filename)
    # notes=await read_notes(file_path)
    return await checklist_access(file_path,notes)

@fileRouter.get("/quiz")
async def quizGenerator(filename:str,difficulty:str,num_of_questions:int):
    BASE_DIR = Path(__file__).resolve().parent.parent.parent
    filename = Path(filename).name
    file_path=str(BASE_DIR/filename)
    ocr_notes=await read_notes(filename)
    quiz=await quiz_generate(file_path,ocr_notes,difficulty,num_of_questions)
    return json.loads(quiz)

