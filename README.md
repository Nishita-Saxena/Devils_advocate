# Devil’s Advocate

## AI-Powered Organizational Reasoning Infrastructure

Devil’s Advocate is an AI-powered decision intelligence platform designed to improve the quality of organizational thinking.

Unlike traditional meeting tools that only generate transcripts or summaries, Devil’s Advocate actively evaluates discussions in real time to:

* detect groupthink,
* surface blind spots,
* identify ethical risks,
* generate counterarguments,
* track agendas,
* and improve decision-making quality.

The platform acts as a live AI co-thinker during discussions.

---

# Problem Statement

Teams in workplaces and classrooms often fall into groupthink, where dominant ideas go unchallenged.

Most meeting tools today:

* record conversations,
* generate summaries,
* extract action items.

However, they do not evaluate:

* how decisions are formed,
* whether stakeholders are ignored,
* whether discussions become biased,
* or whether dangerous consensus forms too quickly.

Devil’s Advocate addresses this problem using real-time AI reasoning.

---

# Key Features

## 1. Manual Discussion Analysis

Users can manually paste discussions or brainstorming conversations.

The AI evaluates:

* Groupthink Risk
* Counterarguments
* Blind Spots
* Ethical Risks
* Missing Perspectives
* Ignored Stakeholders
* Strategic Recommendations

---

## 2. PDF Transcript Analysis

Upload meeting transcripts in PDF format.

The backend:

* extracts text using PyMuPDF,
* processes transcript context,
* generates structured intelligence reports.

---

## 3. Live Meeting Intelligence

The system supports real-time live discussion analysis.

### Capabilities

* Live transcript generation
* Real-time AI reasoning
* Dynamic cognitive analysis
* Groupthink detection
* Ethical risk analysis
* Final executive reporting

---

## 4. Intelligence Workspace

The Workspace is the advanced enterprise intelligence layer.

It combines:

* live meetings,
* organizational context,
* governance policies,
* and agenda intelligence.

---

## 5. Policy-Aware Reasoning

Organizations can upload:

* governance policies,
* ethics frameworks,
* HR guidelines,
* compliance standards.

The AI uses policy context while reasoning.

This creates lightweight Retrieval-Augmented Generation (RAG)-style contextual intelligence.

---

## 6. Agenda Intelligence

Before meetings, users can define:

* agenda items,
* discussion goals,
* approval checkpoints.

During meetings:

* transcript monitoring occurs live,
* agenda progress updates dynamically,
* discussion completion is tracked.

---

# System Architecture

## Frontend

Built using:

* React
* Tailwind CSS
* Lucide React

### Responsibilities

* Live transcript rendering
* Real-time UI updates
* Meeting dashboard
* Workspace management
* File uploads
* Agenda tracking

---

## Backend

Built using:

* FastAPI
* Python

### Responsibilities

* AI reasoning pipeline
* Transcript processing
* PDF extraction
* Policy context injection
* Final report generation

---

## AI Layer

Powered by:

* Ollama
* Mistral LLM

### AI Responsibilities

* Groupthink analysis
* Ethical reasoning
* Counterargument generation
* Stakeholder analysis
* Organizational intelligence

---

# End-to-End Flow

## Manual Analysis

User Input
→ Frontend
→ FastAPI Backend
→ Mistral Reasoning
→ Structured Intelligence Output

---

## PDF Analysis

PDF Upload
→ Text Extraction
→ AI Reasoning
→ Executive Report

---

## Live Meeting Flow

Voice Input
→ Browser Speech Recognition
→ Transcript Stream
→ FastAPI Backend
→ Mistral Reasoning
→ Live Intelligence Dashboard
→ Final Executive Report

---

## Workspace Flow

Policy Upload + Agenda + Live Discussion
↓
Contextual AI Reasoning
↓
Governance Intelligence + Agenda Tracking + Final Report

---

# Why Browser Speech Recognition?

The project intentionally uses browser-native speech recognition for:

* low-latency live transcription,
* lower CPU usage,
* simplified deployment,
* better demo reliability,
* reduced audio pipeline complexity.

The heavy reasoning pipeline remains on the backend using local LLM inference.

---

# Why Local AI?

The system uses local inference through Ollama instead of cloud APIs.

## Advantages

* Privacy
* Offline capability
* Unlimited requests
* Lower operational cost
* Enterprise-friendly deployment

---

# Tech Stack

## Frontend

* React
* Tailwind CSS
* Lucide React

## Backend

* FastAPI
* Python

## AI & Reasoning

* Ollama
* Mistral LLM
* Prompt Engineering

## Processing

* Browser Speech Recognition
* PyMuPDF

---

# Competitive Advantage

| Feature                 | Traditional Meeting Tools | Devil’s Advocate |
| ----------------------- | ------------------------- | ---------------- |
| Transcript Generation   | ✅                         | ✅                |
| Meeting Summaries       | ✅                         | ✅                |
| Action Items            | ✅                         | ✅                |
| Groupthink Detection    | ❌                         | ✅                |
| Ethical Intelligence    | ❌                         | ✅                |
| Counterarguments        | ❌                         | ✅                |
| Policy-Aware Reasoning  | ❌                         | ✅                |
| Stakeholder Analysis    | ❌                         | ✅                |
| Governance Intelligence | ❌                         | ✅                |
| Live Cognitive Analysis | ❌                         | ✅                |

---

# Future Scope

Potential future integrations:

* Zoom
* Microsoft Teams
* Slack
* Enterprise governance systems

Potential future intelligence layers:

* Speaker identification
* Compliance auditing
* Decision quality scoring
* Organization-wide analytics
* Memory systems
* Vector database RAG
---
complete project structure:
DEVILS_ADVOCATE/
│
├── backend/
│   │
│   ├── __pycache__/
│   │
│   ├── temp/
│   │   └── (temporary uploaded PDFs / extracted files)
│   │
│   ├── venv/
│   │   └── (python virtual environment)
│   │
│   ├── main.py
│   │
│   └── requirements.txt
│
│
├── frontend/
│   │
│   ├── node_modules/
│   │
│   ├── public/
│   │
│   └── src/
│       │
│       ├── assets/
│       │   └── (images / logos / static assets)
│       │
│       ├── components/
│       │   └── (reusable UI components)
│       │
│       ├── hooks/
│       │   └── (custom React hooks)
│       │
│       ├── layouts/
│       │   └── (shared page layouts)
│       │
│       ├── pages/
│       │   │
│       │   ├── Analyze.jsx
│       │   │   └── Manual + PDF transcript analysis
│       │   │
│       │   ├── Dashboard.jsx
│       │   │   └── Main landing page / platform overview
│       │   │
│       │   ├── Live.jsx
│       │   │   └── Real-time live meeting intelligence
│       │   │
│       │   └── Workspace.jsx
│       │       └── Policy-aware enterprise intelligence workspace
│       │
│       ├── services/
│       │   └── (API communication layer)
│       │
│       ├── utils/
│       │   └── (helper functions / utilities)
│       │
│       ├── App.css
│       │
│       ├── App.jsx
│       │
│       ├── main.jsx
│       │
│       └── index.css
│
│
├── README.md
│
├── package.json
│
├── package-lock.json
│
├── vite.config.js
│
└── .gitignore


---

# Installation Guide

## 1. Clone Repository

```bash
git clone <repository-url>
cd Devils_advocate
```

---

## 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 3. Backend Setup

```bash
cd backend
python -m venv venv
```

### Activate Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Mac/Linux

```bash
source venv/bin/activate
```

---

## 4. Install Dependencies

```bash
pip install fastapi uvicorn ollama pymupdf python-multipart
```

---

## 5. Run Ollama

Install Ollama:

[https://ollama.com](https://ollama.com)

Pull Mistral model:

```bash
ollama pull mistral
```

Run Ollama locally.

---

## 6. Start Backend

```bash
python -m uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# Demo Flow

Recommended demo order:

1. Manual Discussion Analysis
2. PDF Transcript Analysis
3. Live Meeting Intelligence
4. Intelligence Workspace
5. Policy-Aware Reasoning
6. Final Executive Report

---

# Team

## Team InSquare

Built for:
Problem Statement 03 — Counterpoint

---

# Final Vision

Devil’s Advocate transforms AI from:

“passive meeting assistance”

into:

“active organizational intelligence.”

The goal is not just to record conversations.

The goal is to improve the quality of human reasoning itself.
