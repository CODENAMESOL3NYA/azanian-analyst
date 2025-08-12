var express = require("express");
var router = express.Router();

/* Game. */
router.get("/", function (req, res, next) {
  res.render("game");
});

router.get("/load", async function (req, res, next) {
  let topic = req.query.topic || "HTML, CSS, JS & PYTHON";
  console.log("Topic:" + topic);
  let difficulty = req.query.difficulty;

  const getQuestions = async function (topic, difficulty) {
    // Validate the text
    if (!topic || typeof topic !== "string" || topic.trim() === "") {
      throw new Error("Error: Invalid Input");
    }
    // Url for gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_KEY}`;

    //Prompt
    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `
              Your task is to act as a JSON generator for a developer-focused hangman game. You must only reply with a single, valid JSON array containing exactly 10 objects. Do not include any introductory text, explanations, or markdown.

Each object in the array must have the following four keys: "id", "topic", "question", and "answer".

-   "id": A unique number starting from 1.
-   "topic": The topic string I provide below.
-   "question": A clear question, definition, or riddle whose answer is a single term or a well-known phrase.
-   "answer": The answer to the question, formatted as a string in ALL CAPS to be suitable for a hangman game.

Here are the inputs for this request:

Topic: ${topic}
Difficulty: ${difficulty}

RESPONSE SHOULD FOLLOW THIS FORMAT:
[
  {
  "id":1,
  "topic":"Topic",
  "question":"actual question",
  "answer":"actual answer"
  },
  {
  "id":2,
  "topic":"Topic2",
  "question":"actual question 2",
  "answer":"actual answer 2"
  }
]
IMPORTANT:DONT ADD CODE FENCES

              `,
            },
          ],
        },
      ],
    };
    try {
      // API Call
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      // Convert the reponse to json and get the parts element which holds gemini's response
      const json = await response.json();
      const candidates = json.candidates;
      const { content } = candidates[0];
      const parts = content.parts[0];
      if (parts) {
        console.log("Questions Retrieved");
      }
      const rawResponse = parts.text;
      const cleanedJsonString = rawResponse.replace(/^```json\s*|\s*```$/g, '');

      return JSON.parse(cleanedJsonString);
    } catch (error) {
      console.log(error);
    }
  };
  let data = await getQuestions(topic, difficulty);
  res.json(data)
});

module.exports = router;
