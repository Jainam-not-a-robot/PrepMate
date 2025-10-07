import fitz
from PIL import Image
import pytesseract
import io

def convertImgToText(file_path):
    doc=fitz.open(file_path)
    text=""
    for i in range(len(doc)):
        try:
            page=doc.load_page(i)
            pix=page.get_pixmap()
            img = Image.open(io.BytesIO(pix.tobytes("png")))
            text+=pytesseract.image_to_string(img)
        except:
            raise Exception("Error in extracting text from page {i}")
    print(text)
