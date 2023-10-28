const express = require("express");
const { generateImage } = require("../controllers/Ai.controller");
const router = express.Router();

router.post("/generateImage",generateImage);




module.exports = router;