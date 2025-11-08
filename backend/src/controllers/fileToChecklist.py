from fastapi import File,UploadFile,HTTPException, Depends
from fastapi.responses import JSONResponse
from ..functions.gemini_schedule import useGemini,gemini_for_quiz
from ..functions.pdf_to_text_generator import convertImgToText,get_reader
import os
import aiofiles
import json
from ..db.database import get_db
from sqlalchemy.orm import Session
from ..models.uploadFileModel import FileUploadModel,ChecklistModel, MultipleChecklistModel
from datetime import datetime
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def upload_file(file:UploadFile=File(...),db:Session=Depends(get_db)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload pdf file")

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    async with aiofiles.open(file_path, "wb") as f:
        while chunk := await file.read(1024 * 1024):  # 1 MB chunk
            await f.write(chunk)
    new_file=FileUploadModel(filename=file.filename)
    db.add(new_file)
    db.commit()
    db.refresh(new_file)
    
    return {"message": "File uploaded successfully", "file": new_file.filename}

async def read_notes(file_path:str):
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404,detail="No such file found. Please re-upload")
    get_reader()
    notes_text=await convertImgToText(file_path)
    return notes_text

async def checklist_access():
    checklists=db.query(ChecklistModel).all()
    return checklists
        

async def makeChecklist(file_path:str,notes_text:dict,db:Session=Depends(get_db)):
    checklist=await useGemini(notes_text)
    try:
        # Parse JSON response
        current_time = datetime.now()
        print("-"*100)
        print(checklist)
        checklist=json.loads(checklist)
        parent=MultipleChecklistModel(
            checklist_name="1",
            checklists=[
                ChecklistModel(item=item["topic"], isCompleted=False)
                for item in checklist
            ],
            # created_at=current_time
        )
        
        db.add(parent)
        db.commit()
        db.refresh(parent)
        return parent

    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return {"error": "Invalid JSON response from Gemini"}


async def quiz_generate(file_path:str,ocr_notes:dict,difficulty:str,num_of_questions:int):
    print("-"*100)
    print(file_path)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404,detail="No such file found. Please re-upload")
    return await gemini_for_quiz(ocr_notes,difficulty,num_of_questions)

# async def allChecklists():



# /home/jainam/Documents/projects/PrepMate/backend/uploads/L10.pdf