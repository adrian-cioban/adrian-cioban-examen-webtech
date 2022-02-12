const express = require("express");
const router = express.Router();
const jobPostingRouter = require("./jobPosting");
const candidateRouter = require("./candidate");

router.use("/jobPostings", jobPostingRouter);
router.use("/candidates", candidateRouter);

module.exports = router;
