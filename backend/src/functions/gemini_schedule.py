from dotenv import load_dotenv
import os
import google.generativeai as genai
from google.generativeai import types

# Load API key from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("API key not found in environment variables!")

def useGemini(user_prompt):
    genai.configure(api_key=api_key)

    # Use the model
    model = genai.GenerativeModel(model_name="gemini-2.5-flash")
    
    # Pass the system instruction in the config argument of generate_content
    response = model.generate_content(
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are a planner! The user will provide you with "
        )
    )

    print(response.text)

# Example usage:
useGemini("Hello there")