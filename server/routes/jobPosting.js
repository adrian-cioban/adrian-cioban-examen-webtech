const express = require("express");
const router = express.Router();

const jobPostingController = require("../controllers").jobPosting;

router.get("/", jobPostingController.getAllJobPostings);
router.get("/filter", jobPostingController.getAllJobPostingsFiltered);
router.get("/sort/:forSort", jobPostingController.getAllJobPostingsSorted);
router.get("/export", jobPostingController.export);
router.get("/:id/candidates", jobPostingController.getCandidatesFromJobPosting);

router.post("/", jobPostingController.addJobPosting);
router.post("/import", jobPostingController.import);
router.post("/:id/candidates", jobPostingController.addCandidateToJobPosting);

router.put("/:id", jobPostingController.updateJobPostingById);
router.put(
  "/:jobId/candidates/:candidateId",
  jobPostingController.updateCandidateFromJobPosting
);

router.delete("/:id", jobPostingController.deleteJobPostingById);
router.delete(
  "/:jobId/candidates/:candidateId",
  jobPostingController.deleteCandidateFromJobPosting
);

module.exports = router;
