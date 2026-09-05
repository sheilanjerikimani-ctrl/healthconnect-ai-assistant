const { askAssistant } = require("./assistant");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Please type a question." });
  }

  try {
    const answer = await askAssistant(message);
    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};