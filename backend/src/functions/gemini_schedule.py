"""
    This file uses gemini to make a list of the topics of the text generated from the ocr model 
"""
from dotenv import load_dotenv
import os
import google.generativeai as genai
from google.generativeai import types
import asyncio
from pydantic import BaseModel, ValidationError
import json
from typing import List
# Load API key from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
a=0
if not api_key:
    raise ValueError("API key not found in environment variables!")

class TopicItem(BaseModel):
    id:int
    topic:str

class TopicsResponse(BaseModel):
    topics: List[TopicItem]

async def ValidateOutput(raw_json:str,user_prompt:dict):
    global a
    try:
        data=json.loads(raw_json)
        if isinstance(data,list):
            topics = [TopicItem(**item) for item in data]
            result = TopicsResponse(topics=topics)
        elif isinstance(data,dict) and "topics" in data:
            topics = [TopicItem(**item) for item in data["topics"]]
            return TopicsResponse(topics=topics)
        else:
            if(a<3):
                print("Unexpectedly got wrong output format... Running again")
                a=a+1
                return await useGemini(user_prompt)
            else:
                print("There might be an error. Please sending the notes again :(")
                return None
        return result
    except json.JSONDecodeError as e:
        print("Invalid JSON format:", e)
        print("Raw output:", raw_json)
        return None
    except ValidationError as e:
        print("Schema validation failed:")
        print(e.json())
        return None

async def useGemini(user_prompt: dict):
    """Async wrapper for synchronous Gemini API call."""
    return await _generate_gemini_response(user_prompt)

async def _generate_gemini_response(user_prompt):
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
            response_mime_type="application/json",
            temperature=0.3
        )
    )
    response=""
    if(len(user_prompt["full_text"])<2000):
        response = model.generate_content(user_prompt["full_text"]).text
    else:
        responses = []
        for page_text in user_prompt["page_by_page_text"]:
            part = model.generate_content(page_text)
            responses.append(part.text)
        response= ",".join(responses)
    print(response)
    final_response=await ValidateOutput(response,user_prompt)
    return final_response