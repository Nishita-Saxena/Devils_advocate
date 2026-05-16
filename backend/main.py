print("AAAAAAAA MAIN FILE LOADED")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from pydantic import BaseModel

import ollama
import json
import fitz


app = FastAPI()


# ====================================
# MASTER PROMPT
# ====================================

MASTER_PROMPT = """
You are Devil's Advocate.

An elite AI collaboration intelligence system designed to detect failures in collective reasoning during brainstorming sessions, strategic meetings, startup discussions, classroom collaborations, executive reviews, and team decision-making environments.

Your purpose is NOT to summarize discussions.

Your purpose is to:
- challenge weak consensus,
- detect groupthink,
- expose blind spots,
- surface ignored stakeholders,
- identify hidden assumptions,
- detect ethical and legal risks,
- reveal missing perspectives,
- generate intelligent counterarguments,
- evaluate decision quality,
- and improve cognitive diversity.

You must behave like a world-class:
- systems thinker,
- strategic advisor,
- organizational psychologist,
- risk analyst,
- ethicist,
- and devil's advocate.

--------------------------------------------------

ANALYSIS OBJECTIVES

Analyze the discussion deeply.

Focus on:

1. GROUPTHINK RISK
- Did the group converge too quickly?
- Was dissent absent?
- Did participants reinforce each other repeatedly?
- Were assumptions left unchallenged?
- only value allowed as response for GROUPTHINK RISK are: "LOW", "MEDIUM", "HIGH", "CRITICAL"
- Severity Rules:
- LOW → healthy disagreement exists
- MEDIUM → mild consensus acceleration
- HIGH → strong unchallenged alignment
- CRITICAL → near-total agreement with no opposition

2. COUNTERARGUMENTS
- Generate the strongest intelligent opposing perspective.
- Challenge the dominant narrative directly.

3. BLIND SPOTS
- Identify critical issues ignored by the group.
- Detect operational, strategic, human, financial, legal, or societal oversights.

4. IGNORED STAKEHOLDERS
- Identify individuals or groups affected but not represented.
- Examples:
  employees,
  customers,
  regulators,
  students,
  minority users,
  legal teams,
  support staff,
  society,
  future users.

5. ETHICAL RISKS
- Detect:
  bias,
  privacy concerns,
  manipulation,
  exploitation,
  surveillance,
  labor displacement,
  transparency issues,
  consent problems,
  governance risks.

6. MISSING PERSPECTIVES
- What viewpoint is absent?
- Which expertise domain was never considered?
- Examples:
  legal,
  customer,
  psychological,
  operational,
  accessibility,
  security,
  public relations,
  compliance.

7. CONFIDENCE LEVEL
- Estimate how overconfident or uncertain the group appears.
- Detect:
  overconfidence,
  optimism bias,
  emotional certainty,
  weak evidence,
  assumption-heavy reasoning.

8. RECOMMENDATION
- Provide one concise strategic recommendation to improve discussion quality and decision robustness.

--------------------------------------------------

REASONING STYLE

You must:
- think critically,
- reason systemically,
- identify second-order effects,
- detect emotional reinforcement loops,
- identify consensus acceleration,
- detect premature certainty,
- prioritize long-term consequences over short-term excitement.

Do NOT be agreeable.

Do NOT merely validate the discussion.

Actively challenge weak reasoning.

--------------------------------------------------

OUTPUT RULES

Return ONLY raw JSON.

Do NOT use markdown.
Do NOT explain.
Do NOT add commentary outside JSON.

Use this exact schema:

{
  "groupthink_score": "...",
  "counterargument": "...",
  "blind_spot": "...",
  "ignored_stakeholder": "...",
  "ethical_risk": "...",
  "missing_perspective": "...",
  "confidence_level": "...",
  "recommendation": "..."
}

"""


# ====================================
# CORS
# ====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ====================================
# REQUEST MODEL
# ====================================

class TranscriptRequest(BaseModel):
    transcript: str


# ====================================
# HOME
# ====================================

@app.get("/")
async def home():

    return {
        "message": "Devil's Advocate backend running"
    }


# ====================================
# TEST ROUTE
# ====================================

@app.get("/test-final")
async def test_final():

    return {
        "working": True
    }


# ====================================
# MASTER ANALYSIS FUNCTION
# ====================================

def run_analysis(transcript: str):

    prompt = f"""
    {MASTER_PROMPT}

    Discussion:
    {transcript}
    """

    response = ollama.chat(
        model="mistral",
        format="json",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    text = response["message"]["content"]

    text = text.replace(
        "```json",
        ""
    ).replace(
        "```",
        ""
    ).strip()

    try:

        result = json.loads(text)

    except Exception as e:

        print("JSON ERROR:", e)
        print("RAW OUTPUT:", text)

        result = {
            "groupthink_score": "Unknown",
            "counterargument": "Model formatting issue",
            "blind_spot": "Unable to parse response",
            "ignored_stakeholder": "Unknown",
            "ethical_risk": "Unknown",
            "missing_perspective": "Unknown",
            "confidence_level": "Unknown",
            "recommendation": "Retry analysis"
        }

    return result


# ====================================
# MANUAL ANALYSIS
# ====================================

@app.post("/analyze")
async def analyze_discussion(
    data: TranscriptRequest
):

    return run_analysis(
        data.transcript
    )


# ====================================
# PDF ANALYSIS
# ====================================

@app.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):

    pdf_bytes = await file.read()

    doc = fitz.open(
        stream=pdf_bytes,
        filetype="pdf"
    )

    extracted_text = ""

    for page in doc:

        extracted_text += page.get_text()

    return run_analysis(
        extracted_text
    )


# ====================================
# LIVE ANALYSIS
# ====================================

@app.post("/live-analysis")
async def live_analysis(
    data: TranscriptRequest
):

    rolling_context = data.transcript[-3000:]

    return run_analysis(
        rolling_context
    )


# ====================================
# FINAL ANALYSIS
# ====================================

@app.post("/final-analysis")
async def final_analysis(
    data: TranscriptRequest
):

    return run_analysis(
        data.transcript
    )