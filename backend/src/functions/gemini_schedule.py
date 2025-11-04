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
if not api_key:
    raise ValueError("API key not found in environment variables!")

class TopicItem(BaseModel):
    id:int
    topic:str

class TopicsResponse(BaseModel):
    topics: List[TopicItem]

async def ValidateOutput(raw_json:str,user_prompt:dict):
    # global a
    try:
        data=json.loads(raw_json)
        if isinstance(data,list):
            topics = [TopicItem(**item) for item in data]
            result = TopicsResponse(topics=topics)
        elif isinstance(data,dict) and "topics" in data:
            topics = [TopicItem(**item) for item in data["topics"]]
            result = TopicsResponse(topics=topics)
        else:
            print("Unexpected format")
            return None
        return result.model_dump()
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
    i=0
    for i in range(3):
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
        if(final_response is not None):
            break
    if(i==3):
        return None

    return final_response

async def gemini_for_quiz(ocr_notes:dict,difficulty:str,num_of_questions:int):
    return await _use_gemini_for_quiz(ocr_notes,difficulty,num_of_questions)

async def _use_gemini_for_quiz(ocr_notes:dict,difficulty:str,num_of_questions:int):
    notes=ocr_notes["page_by_page_text"]
    num_of_pages=len(notes)
    temp=None
    if(difficulty=="Hard"):
        temp=1.5
    elif(difficulty=="Medium"):
        temp=0.8
    elif(difficulty=="Easy"):
        temp=0.1
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=(
            f"""
            You are an expert educational assistant specializing in generating structured, multiple-choice quizzes from user-provided notes.

            1.  **INPUT HANDLING:** Your primary input will be text from ocr of **{num_of_pages}** number of pages, where each page's text will be an entry in dict provided to you. You must first transcribe and understand the core concepts, facts, and definitions from the provided image. 
            2.  **TASK:** Generate a quiz consisting of exactly **{num_of_questions}** multiple-choice questions based *only* on the content of the handwritten notes.
            3.  **DIFFICULTY:** The questions must be of **{difficulty}** difficulty. Interpret "easy" as simple recall, "medium" as understanding and application, and "hard" as requiring synthesis, analysis, or critical thinking.
            4.  **FORMAT STRICTNESS:** You **MUST** output the response as a single, plain **CSV (Comma Separated Values)** block. Do not include any headers, introductory text, explanations, or code block delimiters (like ```csv) outside of the raw CSV data.
            5.  **CSV STRUCTURE:** The CSV must contain **exactly** 7 columns in this strict order:
                * `question_id` (A sequential integer starting at 1)
                * `question` (The full text of the question)
                * `option_1`, `option_2`, `option_3`, `option_4` (Four distinct answer choices)
                * `correct_answer` (The text of the correct option, exactly matching one of the four options)
            6.  **ESCAPING:** All text fields must be enclosed in double quotes (`"`) to properly handle commas within the question or options.

            **Example Row Format (Do NOT include this in the final output, this is for your reference):**
            "1","What is the capital of France?","London","Paris","Berlin","Rome","Paris"
            """
        ),
        generation_config=types.GenerationConfig(
            response_mime_type="application/json",
            temperature=temp or 0.7
        )

    )
    response=model.generate_content(notes)
    print(response)
    return response.text

# notes="""
# Jainam Shah bzacs1o71alitjacin Portfolic Websito 91 98252 69689 PROJECTS EDUCATION INTELLIBROWSE IAI-DRIVEN AUTONOMOUS WED DROWSER IIT JODHPUR (DEvLUP LADS IIT JoDHPUR} BTECH IN CoMPUTER SCIENCE AND June 2025 - present E4GINEERING Expected 2028 IncellbrowVseis3n Alarivenbrowserthat transtcrms CGPA: 8 85 10 (Till znd Semesterl naturzl language queries into completewreb tasks, enibling autonomcus Droivsingind interitrion RELEVANT COURSEWORK Built znLLM Fov ered intent parser that translates user goals Introduction Computer Science structured mmands executed via Playviright automation: Dara Struchures Designed Nextjs dashboardwrithreal time progress tracking visual Xeonchms tiskreplayana errordepuzzine intertace Maths for Computation Used CrewAlto creare aeentic Alwonkilov 5 enabling collaborative tisk erecutionBMonE specialized brcivser and data Probz biliry; Statistics and Stochasuic processes Currently integrating MCP (Model Context Protocoll tools to ennance roperability between agents znd externaldata systems; improving contextua 7uareness anderensibilin ACHIEVEMENTS Tech Stack: FastAp PostgreSQLReactNextjs CrevAI. Playwright; Webscckets Docker JEE Advanced 2024: AIR 2665 CitHub Ccm 'devlud labs /Intelligent Brov ser JEE Mains 2024: AIR 471 TRAVEL PLANNER LOCATION-BASED TRAVEL SUGGESTION WED APP SKILLS Apr 2025 Preceni PROGRAMMING dersonz Ifull stack zpplication designed heidrax Lers exdlore desrinaticns attracons andtrave routes across Indiz Ctt Pihon lavaScrint TypeScript; Java HTML, CSS SQL. Dirt Implements dynimic ciry search with integrated APIs tofetch attractionsweather and transportation (trzinvflight) cptions FRAMEWORKSITOOLS Features ecdonei mzp based Ulwith Tailwind CSS and Reactjs NexcjsNodejs Expressjs, server side renderingvia Next js App Router Fastap Crew ALPiayvrizht;Izinand Added caching and API throttling to improve load speed by 40X,and Flutte minimize caungant netwvcrk requests Future plans include itinerary generation LLKsummarizarion TECHNOLOGIES Mads integration_ Git, Linux (Ubuntu CLI) PostgreSOL Tech Stack: Nextjs. Type Script, Tailvrind CSS Ncdejs. Expressjs SQLite; REST APIs; Docker; Render; Docker Verrei Render Vercel VSCode Github: 2ithubcomJainam nor] rodotaIrzve Planner Website: httos?/ trave clanner ~webvercel Zpp LINKS ML ALGORITHMS INC |ICS MAJOR PROJECT SPRING 2025 GitHub: Jainam nota robot Feb 2025 Yar 2025 Linkedln: jainam shah2? Part or 2 ~member acidemic project aimed atimplementing core LeetCode lainam nctarokoi maching eamnine zonthms trom scratch Implemented Linea Regression Logistic Regression, Softmax Lodetcrces: Jainzn Regression; K Nearest Neighbors and Nin Max Normalization Trichout erternz librzries Personz developed Softmax Regression andintegrated CNUPLOT for 2D visualization ofmodel performance Focusedcn Igorithm Drimizaticn Memory efficiency and mcdular design for reusable MLcomponents Benchmarkem Eonchm pertormance rustom darasets ano visualized convergence trends graphically Tech Stack: CNUFLOT Linux CLI GitHub: githubcomJainam nota robot/ICS Major Proiect eichud using Goog
# """

# difficulty="Hard"
# num=5
# answer=gemini_for_quiz(notes,difficulty,num)
# print("-"*100)
# print(answer.text)
# print("-"*100)