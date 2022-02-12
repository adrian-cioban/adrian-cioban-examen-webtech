const express = require("express");
const router = express.Router();

const candidateController = require("../controllers").candidate;

router.get("/", candidateController.getAllCandidates);

module.exports = router;
