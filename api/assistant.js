const KNOWLEDGE_BASE = `
HEALTHCONNECT CLINIC KNOWLEDGE BASE

LOCATIONS AND HOURS:
- Central Clinic: 14 Wellness Avenue, Central District
- Lakeside Clinic: 8 Care Street, Lakeside District
- Monday-Friday: 8:00 AM-6:00 PM
- Saturday: 9:00 AM-2:00 PM
- Sunday and public holidays: Closed

SERVICES:
- General outpatient consultations
- Follow-up consultations
- Selected specialist consultations by appointment
- Diagnostic and routine laboratory services by appointment or referral
- Preventive health and wellness consultations

BOOKING AN APPOINTMENT:
Request through the clinic booking channel, reception, or an approved appointment platform.
Steps: select preferred location, choose available date/time, provide contact information, review details, confirm, and keep the appointment reference.

RESCHEDULING OR CANCELLING:
Contact the clinic as early as possible. Provide the appointment reference or enough info to locate it. Rescheduling is subject to availability. Cancellation/rescheduling conditions may depend on service type.

LATE ARRIVAL AND MISSED APPOINTMENTS:
Arrive at least 15 minutes early for administrative processing. Late arrivals may need to wait or be rescheduled if the clinician cannot accommodate the delay. Repeated missed appointments may affect future scheduling. Contact reception if expecting to be late or unable to attend.

WHAT TO BRING:
Valid ID where required, appointment confirmation/reference, relevant referral or supporting documents, anything specifically requested by the clinic. Do NOT give personalized clinical preparation instructions (e.g. medication changes).

PAYMENT AND BILLING:
Varies by service. Contact reception for accepted payment methods, estimated charges, or billing procedures. Never invent prices, insurance coverage, or discounts.

FAQs:
Q: What time does the clinic open? A: Mon-Fri 8AM-6PM, Sat 9AM-2PM, closed Sunday/holidays.
Q: How do I book? A: Through an approved booking channel or reception; keep your confirmation.
Q: Can I reschedule? A: Yes, contact the clinic early; subject to availability.
Q: What if I can't attend? A: Contact the clinic early to reschedule or cancel.
Q: How early should I arrive? A: At least 15 minutes before the appointment.
Q: What should I bring? A: Required ID, confirmation info, and any requested documents.
Q: Do you provide emergency services? A: No. Seek immediate help from emergency services if in danger.
Q: Can you tell me what illness I have? A: No. This assistant does not diagnose. Contact a qualified healthcare professional.
`;

const SYSTEM_PROMPT = `You are the HealthConnect Clinic Healthcare Information Assistant. You provide administrative and informational support ONLY, based strictly on the knowledge base below. You are not a doctor, nurse, or medical professional.

${KNOWLEDGE_BASE}

RULES YOU MUST FOLLOW:
1. Only answer using the knowledge base above. If the answer isn't there, say you don't have that information and direct the user to clinic reception.
2. NEVER diagnose a condition, interpret symptoms, or suggest what illness someone might have.
3. NEVER recommend or name medication or treatment.
4. If a user describes a possible emergency, immediately tell them to seek emergency help right away, and do not continue with anything else.
5. NEVER invent prices, policies, or appointment availability not stated above.
6. NEVER present yourself as a doctor or clinical authority.
7. Keep responses clear, short, and practical.
8. If a request is ambiguous, ask a clarifying question rather than guessing.
9. When declining a request because it is medical, diagnostic, or treatment-related, explicitly say so (e.g. "I can't recommend medication — please consult a healthcare professional") rather than only redirecting to other topics.
10. If your knowledge fails to cover a request, say so honestly rather than guessing, and always suggest the user contact clinic reception.

Respond in plain text, no Markdown, no asterisks.`;

async function callGemini(userInput) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nPatient message: ${userInput}` }] }]
      })
    }
  );
  const data = await response.json();
  console.log("GEMINI STATUS:", response.status, "RAW:", JSON.stringify(data));
  if (!response.ok) throw new Error(`Gemini ${response.status}`);
  return data.candidates?.[0]?.content?.parts?.[0]?.text;
}

async function callOpenAI(userInput) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userInput }
      ]
    })
  });
  const data = await response.json();
  console.log("OPENAI STATUS:", response.status, "RAW:", JSON.stringify(data));
  if (!response.ok) throw new Error(`OpenAI ${response.status}`);
  return data.choices?.[0]?.message?.content;
}

async function askAssistant(userInput) {
  try {
    const answer = await callGemini(userInput);
    if (answer) return answer;
    throw new Error("Empty Gemini response");
  } catch (primaryErr) {
    console.log("Primary provider (Gemini) failed, falling back to OpenAI:", primaryErr.message);
    try {
      const answer = await callOpenAI(userInput);
      if (answer) return answer;
      throw new Error("Empty OpenAI response");
    } catch (fallbackErr) {
      console.log("Fallback provider (OpenAI) also failed:", fallbackErr.message);
      return "I'm sorry, I couldn't process that right now. Please contact clinic reception.";
    }
  }
}

module.exports = { askAssistant };