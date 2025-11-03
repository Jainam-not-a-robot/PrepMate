from fastapi import File,UploadFile,HTTPException
from fastapi.responses import JSONResponse
from ..functions.gemini_schedule import useGemini
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

async def checklist_access(file_path:str):
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404,detail="No such file found. Please re-upload")
    get_reader()
    notes_text=await convertImgToText(file_path)
    checklist=await useGemini(notes_text)
    try:
        # Parse JSON response
        print("-"*100)
        print(checklist)
        topics = json.loads(checklist)
        
        return topics
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return {"error": "Invalid JSON response from Gemini"}

