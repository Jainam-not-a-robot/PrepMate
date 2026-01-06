import asyncio
import pymupdf as fitz 
from PIL import Image
import io
import easyocr
reader=None
import numpy as np
def get_reader():
    global reader
    if reader is None:
        reader = easyocr.Reader(['en'])
    return reader

async def convertImgToText(file_path: str) -> str:
    """Asynchronous wrapper for PDF image-to-text conversion."""
    return await asyncio.to_thread(_convert_img_to_text_sync, file_path)


def _convert_img_to_text_sync(file_path: str) -> str:
    """Synchronous OCR processing — runs in a thread."""
    doc = fitz.open(file_path)
    text = ""
    
    pages=[]

    for i in range(len(doc)):
        try:
            print(f"Running on page {i + 1}...")
            page = doc.load_page(i)
            pix = page.get_pixmap()
            img = Image.open(io.BytesIO(pix.tobytes("png")))

            img_np = np.array(img)

            # Run OCR
            result = reader.readtext(img_np)
            page_text = " ".join([res[1] for res in result])
            text += page_text + "\n\n"
            pages.append(page_text)    

        except Exception as e:
            raise Exception(f"Error in extracting text from page {i + 1}: {e}")
    doc.close()
    ocr_result={
        "full_text":text,
        "page_by_page_text":pages
    }
    print(text)
    return ocr_result
