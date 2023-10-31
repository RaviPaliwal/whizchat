const express = require("express");
const { generateImage, chatwithbot } = require("../controllers/Ai.controller");
const router = express.Router();

router.post("/generateImage",generateImage);
router.get("/chatwithbot/:query",chatwithbot);




module.exports = router;