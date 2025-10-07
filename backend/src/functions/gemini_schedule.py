from dotenv import load_dotenv
import os
import google.generativeai as genai
from google.generativeai import types
import asyncio

# Load API key from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("API key not found in environment variables!")

async def useGemini(user_prompt: str):
    """Async wrapper for synchronous Gemini API call."""
    return await asyncio.to_thread(_generate_gemini_response, user_prompt)

def _generate_gemini_response(user_prompt):
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=(
            "You are a planner! The user will provide you with text "
            "generated from image-to-text models from handwritten or printed notes. "
            "Your role is to give output in JSON format, as a list of objects, each with 'id' (whole number) and 'topic' (string containing main topic covered in the notes). "
            "Example: [{'id': 1, 'topic': 'Introduction to AI'}, {'id': 2, 'topic': 'Machine Learning Basics'}]"
        ),
        generation_config=types.GenerationConfig(
            response_mime_type="application/json"
        )
    )
    response = model.generate_content(user_prompt)
    print(response.text)
    return response.text

async def main():
    text = """"""
    result = await useGemini(text)
    # You can do something with result here if needed

if __name__ == "__main__":
    asyncio.run(main())
