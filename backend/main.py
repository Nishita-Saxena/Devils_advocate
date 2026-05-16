from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama
import json
from fastapi import UploadFile, File
import fitz

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class TranscriptRequest(BaseModel):
    transcript: str

# Test Route
@app.get("/")
def home():
    return {"message": "Backend running"}

# AI Analysis Route
@app.post("/analyze")
async def analyze_discussion(data: TranscriptRequest):

    prompt = f"""
    You are an AI collaboration analyst.

    Analyze the following brainstorming discussion.

    Detect:
    - groupthink risk
    - blind spots
    - missing perspectives
    - counterarguments
    - emotional bias
    - ignored stakeholder
    - confidence level

    task sequence:
    1. Detect level of groupthink
    2. Identify ignored stakeholders
    3. Detect hidden assumptions
    4. Generate a strong counterargument
    5. Identify ethical or legal risks
    6. Estimate confidence level

    Return ONLY raw JSON.
    Do not use markdown.
    Do not explain anything.

    Example format:
      {{
        "groupthink_score": "...",
        "counterargument": "...",
        "blind_spot": "...",
        "ignored_stakeholder": "...",
        "ethical_risk": "...",
        "confidence_level": "..."
      }}


    Discussion:
    {data.transcript}
    """

    response = ollama.chat(
        model="mistral",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    text = response["message"]["content"]

    # Remove markdown formatting
    text = text.replace("```json", "").replace("```", "").strip()

    try:
        result = json.loads(text)
    except Exception as e:
        result = {
            "groupthink_score": "Unknown",
            "counterargument": text,
            "blind_spot": f"JSON parsing failed: {str(e)}",
            "missing_perspective": "Unknown"
        }

    return result

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    # Read PDF bytes
    pdf_bytes = await file.read()

    # Open PDF
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")

    extracted_text = ""

    # Extract text page by page
    for page in doc:
        extracted_text += page.get_text()

    # AI Prompt
    prompt = f"""
    You are an AI collaboration intelligence system.

    Analyze the discussion transcript below.

    Detect:
    - groupthink risk
    - blind spots
    - ignored stakeholders
    - counterarguments
    - ethical risks
    - confidence level

    Return ONLY raw JSON.

    Format:
    {{
      "groupthink_score": "...",
      "counterargument": "...",
      "blind_spot": "...",
      "ignored_stakeholder": "...",
      "ethical_risk": "...",
      "confidence_level": "..."
    }}

    Transcript:
    {extracted_text}
    """

    response = ollama.chat(
        model="mistral",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    text = response["message"]["content"]

    text = text.replace("```json", "").replace("```", "").strip()

    try:
        result = json.loads(text)
    except Exception as e:
        result = {
            "groupthink_score": "Unknown",
            "counterargument": text,
            "blind_spot": f"JSON parsing failed: {str(e)}",
            "ignored_stakeholder": "Unknown",
            "ethical_risk": "Unknown",
            "confidence_level": "Unknown"
        }

    return result