const express = require("express");
const router = express.Router();
const generator = require("../services/generator");
/* Game. */
router.get("/", function (req, res, next) {
  res.render("game");
});

router.get("/load", async function (req, res, next) {
  try {
    let topic = req.query.topic || "HTML, CSS, JS & PYTHON";
    let difficulty = req.query.difficulty;
    let rounds = req.query.rounds
    console.log(rounds)

    const data = await generator.getQuestions(topic, difficulty,rounds);
    if(!data){
      return res.json({message:"Failed to load Data"})
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({error:"Internal Server Error"})
  }
});

router.get("/success", function (req, res, next) {
  res.render("success",{ title: 'AZANIAN ANALYST', email:process.env.CONTACT_EMAIL,coffee:process.env.BUY_ME_A_COFFEE_URL,github:process.env.GITHUB_URL });
});
router.get("/retry", function (req, res, next) {
  res.render("retry",{ title: 'AZANIAN ANALYST', email:process.env.CONTACT_EMAIL,coffee:process.env.BUY_ME_A_COFFEE_URL,github:process.env.GITHUB_URL });
});
module.exports = router;
