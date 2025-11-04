from fastapi import File,UploadFile,HTTPException
from fastapi.responses import JSONResponse
from ..functions.gemini_schedule import useGemini,gemini_for_quiz
from ..functions.pdf_to_text_generator import convertImgToText,get_reader
import os
import aiofiles
import json
async def upload_file(file:UploadFile=File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload pdf file")
    async with aiofiles.open(file.filename, "wb") as f:
        while chunk := await file.read(1024 * 1024):  # 1 MB chunk
            await f.write(chunk)
    return JSONResponse({"filename":file.filename})

async def read_notes(file_path:str):
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404,detail="No such file found. Please re-upload")
    get_reader()
    notes_text=await convertImgToText(file_path)
    return notes_text

async def checklist_access(file_path:str,notes_text:dict):
    checklist=await useGemini(notes_text)
    try:
        # Parse JSON response
        print("-"*100)
        print(checklist["topics"])
        return checklist["topics"]
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return {"error": "Invalid JSON response from Gemini"}

async def quiz_generate(file_path:str,ocr_notes:dict,difficulty:str,num_of_questions:int):
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404,detail="No such file found. Please re-upload")
    return await gemini_for_quiz(file_path,ocr_notes,difficulty,num_of_questions)


