const CandidateDb = require("../models").Candidate;

const controller = {
  getAllCandidates: async (req, res) => {
    CandidateDb.findAll()
      .then((candidates) => {
        res.status(200).send(candidates);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
