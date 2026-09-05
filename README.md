# HealthConnect Clinic — Healthcare Information Assistant

**Programme:** AnalystLab Africa Experience Lab
**Track:** Generative AI
**Author:** Sheila Kimani

## About This Project

HealthConnect Clinic is a fictional outpatient healthcare provider used as a shared, multi-week Experience Lab project across all AnalystLab Africa internship tracks. The Generative AI track's contribution is a Healthcare Information Assistant that provides safe, approved administrative and informational support to patients, with the goal of helping reduce missed appointments and repetitive enquiries reaching clinic reception.

This project runs from Week 4 through the end of the Experience Lab, building incrementally week over week. It is separate from and does not replace the Week 1–3 internship projects in this intern's other repositories.

## Business Problem

HealthConnect Clinic faces missed appointments, inefficient use of appointment slots, and repetitive patient enquiries about clinic procedures. The central project question: *How can HealthConnect Clinic use data and AI to reduce missed appointments and improve the patient support experience?*

## Generative AI Track Scope

The assistant is strictly limited to approved administrative and informational support, grounded entirely in the official HealthConnect Clinic Knowledge Base. It does not diagnose conditions, recommend treatment, or provide emergency medical advice — all such requests are escalated per defined rules rather than answered directly.

## Progress by Week

### Week 4 — Problem Understanding & Initial Design
- Reviewed the HealthConnect business scenario and approved Knowledge Base
- Defined the assistant's purpose, target users, supported use cases, and out-of-scope boundaries
- Established safety boundaries and escalation rules for medical, diagnostic, and emergency-adjacent requests
- Documented an initial assistant workflow

**Deliverables:** [`docs/AI_Assistant_Design_Document_Week4.docx`](./docs/AI_Assistant_Design_Document_Week4.docx), [`docs/Week4_Project_Summary.docx`](./docs/Week4_Project_Summary.docx)

*(Later weeks will be added here as the project progresses.)*

## Knowledge Source

All factual claims the assistant makes must be traceable to the approved `HealthConnect_Clinic_Knowledge_Base.docx`, provided as part of the Experience Lab resources. No clinic policy, price, or medical information is invented beyond this source.

## Project Structure
```
healthconnect-ai-assistant/
├── docs/
│   ├── AI_Assistant_Design_Document_Week4.docx
│   └── Week4_Project_Summary.docx
└── README.md
```