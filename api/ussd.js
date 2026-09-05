const { askAssistant } = require("./assistant");

module.exports = async function handler(req, res) {
  const { text } = req.body;

  let response = "";
  try {
    if (text === "") {
      response = `CON Welcome to HealthConnect.\nType your question about hours, booking, or appointments.`;
    } else {
      const answer = await askAssistant(text);
      const trimmed = answer.length > 300 ? answer.slice(0, 297) + "..." : answer;
      response = `END ${trimmed}`;
    }
  } catch (err) {
    response = `END Sorry, something went wrong. Please contact reception.`;
  }

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(response);
};