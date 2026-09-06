# HealthConnect Clinic — Healthcare Information Assistant

**Programme:** AnalystLab Africa Experience Lab
**Track:** Generative AI
**Author:** Sheila Kimani

## About This Project

HealthConnect Clinic is a fictional outpatient healthcare provider used as a shared, multi-week Experience Lab project across all AnalystLab Africa internship tracks. The Generative AI track's contribution is a Healthcare Information Assistant that provides safe, approved administrative and informational support to patients, aimed at reducing missed appointments and repetitive enquiries reaching clinic reception.

## Business Problem

HealthConnect Clinic faces missed appointments, inefficient use of appointment slots, and repetitive patient enquiries about clinic procedures. Central project question: *How can HealthConnect Clinic use data and AI to reduce missed appointments and improve the patient support experience?*

## Live Prototype

- **Web Chat:** [healthconnect-ai-assistant.vercel.app](https://healthconnect-ai-assistant.vercel.app)
- **USSD:** `*384*6838#` (Africa's Talking Sandbox — testable via their USSD Simulator)

## Architecture

A single shared backend module (`api/assistant.js`) contains the system prompt and the full HealthConnect Clinic Knowledge Base, called identically by two thin channel interfaces:
- `api/chat.js` — powers the web chat interface (`index.html`)
- `api/ussd.js` — powers the USSD flow via Africa's Talking

This ensures both channels enforce identical safety rules and knowledge grounding, since neither channel contains its own logic beyond formatting input/output for its medium.

## Scope

The assistant is strictly limited to approved administrative and informational support. It does not diagnose conditions, recommend treatment or medication, or provide emergency medical advice — all such requests are escalated per defined rules rather than answered directly. See `docs/AI_Assistant_Design_Document_Week4.docx` for full scope and safety boundary definitions.

## Progress by Week

### Week 4 — Problem Understanding & Initial Design
- Defined assistant purpose, target users, supported use cases, and out-of-scope boundaries
- Established safety boundaries and escalation rules
- Documented an initial assistant workflow

**Deliverables:** [`docs/AI_Assistant_Design_Document_Week4.docx`](./docs/AI_Assistant_Design_Document_Week4.docx), [`docs/Week4_Project_Summary.docx`](./docs/Week4_Project_Summary.docx)

### Week 5 — Prototype Development & Testing
- Built and deployed a working prototype across two channels: web chat and USSD
- Designed a 10-prompt library across 5 required categories (normal, ambiguous, unsupported, escalation, info-unavailable)
- Live-tested safety-critical scenarios, including a medication-recommendation refusal
- Identified and documented a genuine limitation: intermittent LLM provider rate-limiting (Gemini and Mistral free tiers) during testing
- Documented a cross-track collaboration point with the Data Analytics track

**Deliverables:** [`docs/HealthConnect_Prototype_Package_Week5.docx`](./docs/HealthConnect_Prototype_Package_Week5.docx), [`docs/Week5_Project_Summary.docx`](./docs/Week5_Project_Summary.docx)

*(Later weeks will be added here as the project progresses.)*

## Tech Stack

- Backend: Node.js (Vercel serverless functions)
- LLM Providers: Google Gemini (primary), Mistral AI (tested contingency)
- USSD Gateway: Africa's Talking (Sandbox)
- Hosting: Vercel

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/sheilanjerikimani-ctrl/healthconnect-ai-assistant.git
cd healthconnect-ai-assistant
```

### 2. Get a Gemini API key
Sign up at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) → Create API key.

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import this repo
2. Add environment variable: `GEMINI_API_KEY` = your key
3. Deploy

### 4. Set up Africa's Talking (for USSD)
1. Create a free sandbox account at [account.africastalking.com](https://account.africastalking.com)
2. Go to **USSD** → create/select a service code
3. Set the Callback URL to: `https://your-deployment.vercel.app/api/ussd`

### 5. Test
- Web: open your deployed URL directly
- USSD: use Africa's Talking's built-in USSD Simulator

## Project Structure
healthconnect-ai-assistant/
├── api/
│ ├── assistant.js — shared system prompt + knowledge base + LLM call
│ ├── chat.js — web chat endpoint
│ └── ussd.js — USSD webhook endpoint
├── index.html — web chat interface
├── docs/
│ ├── AI_Assistant_Design_Document_Week4.docx
│ ├── Week4_Project_Summary.docx
│ ├── HealthConnect_Prototype_Package_Week5.docx
│ └── Week5_Project_Summary.docx
├── package.json
└── README.md


## Known Limitations

- No live database or booking-system integration — informational only
- Depends on a single LLM provider at a time, with no automatic fallback if that provider is rate-limited or unavailable (encountered during Week 5 testing)
- Some refusal responses are currently implicit rather than explicit (identified in Week 5 testing, planned fix for Week 6)
- USSD's short session timeout can collide with LLM response latency under provider slowdowns

## Future Improvements

- Retest all 10 prompt library cases with full live evidence
- Strengthen system prompt for explicit medical/diagnostic refusals
- Add a provider-fallback mechanism for LLM availability issues
- Ground factual responses against a live, updatable knowledge source rather than a static embedded document