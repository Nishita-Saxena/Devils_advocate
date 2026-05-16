from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranscriptRequest(BaseModel):
    transcript: str

@app.get("/")
def home():
    return {"message": "Backend running"}

@app.post("/analyze")
def analyze_discussion(data: TranscriptRequest):

    transcript = data.transcript

    # MOCK AI RESPONSE
    return {
        "groupthink_score": "82% - High Consensus Detected",
        "counterargument": (
            "The team assumes users want AI automation, "
            "but some users may prefer manual control for trust reasons."
        ),
        "blind_spot": (
            "No discussion about privacy implications "
            "or long-term user retention."
        ),
    }