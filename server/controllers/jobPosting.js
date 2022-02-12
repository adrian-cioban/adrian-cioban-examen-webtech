const JobPostingDb = require("../models").JobPosting;
const CandidateDb = require("../models").Candidate;
const { Op } = require("sequelize");

const controller = {
  getAllJobPostings: async (req, res) => {
    JobPostingDb.findAll()
      .then((jobs) => {
        res.status(200).send(jobs);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getAllJobPostingsFiltered: async (req, res) => {
    const { id, deadline } = req.query;
    JobPostingDb.findAll({
      where: {
        id: { [Op.eq]: id },
        deadline: { [Op.gt]: deadline },
      },
    })
      .then((jobs) => {
        res.status(200).send(jobs);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getAllJobPostingsSorted: async (req, res) => {
    const { forSort } = req.params;
    JobPostingDb.findAll({
      order: [[forSort, "ASC"]],
    })
      .then((jobs) => {
        res.status(200).send(jobs);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  addJobPosting: async (req, res) => {
    let errors = [];
    const { descriere, deadline } = req.body;
    if (!descriere || !deadline) {
      errors.push("empty fields!");
    }
    if (descriere.length < 3) {
      errors.push("descriprion too short!");
    }

    if (errors.length === 0) {
      JobPostingDb.create({
        descriere: descriere,
        deadline: deadline,
      })
        .then((job) => {
          res.status(201).send(job);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ message: "Server error!" });
        });
    } else {
      console.log("Error");
      res.status(400).send(errors);
    }
  },

  updateJobPostingById: async (req, res) => {
    let errors = [];
    const { id } = req.params;
    const { descriere, deadline } = req.body;
    if (!descriere || !deadline) {
      errors.push("empty fields!");
    }
    if (descriere.length < 3) {
      errors.push("descriprion too short!");
    }

    if (errors.length === 0) {
      JobPostingDb.findByPk(id)
        .then((job) => {
          if (job) {
            job.update(req.body);
            res.status(202).send(job);
          } else {
            res.status(404).send({ message: "Job Posting not found!" });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ message: "Server error!" });
        });
    } else {
      console.log("Error");
      res.status(400).send(errors);
    }
  },

  deleteJobPostingById: async (req, res) => {
    const { id } = req.params;
    JobPostingDb.findByPk(id)
      .then((job) => {
        if (job) {
          job.destroy();
          res.status(202).send({ message: "deleted" });
        } else {
          res.status(404).send({ message: "Job Posting not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getCandidatesFromJobPosting: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided" });
    }

    JobPostingDb.findByPk(id, {
      include: [{ model: CandidateDb, as: "Candidate" }],
    })
      .then((job) => {
        if (job) {
          res.status(200).send(job.Candidate);
        } else {
          res.status(404).send({ message: "Job Posting not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  addCandidateToJobPosting: async (req, res) => {
    const { id } = req.params;
    const { nume, cv, email } = req.body;
    if (!id) {
      res.status(400).send({ message: "Job ID not provided" });
    }

    JobPostingDb.findByPk(id)
      .then((job) => {
        if (job) {
          if (nume) {
            if (nume.length >= 5) {
              if (cv) {
                if (cv.length >= 100) {
                  if (cv.length <= 255) {
                    if (email) {
                      if (
                        email.match(
                          "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
                        )
                      ) {
                        job
                          .createCandidate({ nume, cv, email })
                          .then((candidate) => {
                            res.status(201).send(candidate);
                          })
                          .catch((error) => {
                            console.log(error);
                            res.status(500).send({ message: "Server error!" });
                          });
                      } else {
                        res.status(400).send({ message: "Invalid email!" });
                      }
                    } else {
                      res.status(400).send({ message: "No email entered!" });
                    }
                  } else {
                    res.status(400).send({ message: "CV too long!" });
                  }
                } else {
                  res.status(400).send({ message: "CV too short!" });
                }
              } else {
                res.status(400).send({ message: "No cv entered!" });
              }
            } else {
              res.status(400).send({ message: "Name too short!" });
            }
          } else {
            res.status(400).send({ message: "No name entered!" });
          }
        } else {
          res.status(404).send({ message: "Job Posting not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  updateCandidateFromJobPosting: async (req, res) => {
    const { jobId, candidateId } = req.params;
    const { nume, cv, email } = req.body;
    if (!jobId) {
      res.status(400).send({ message: "Job Posting ID not provided" });
    }
    if (!candidateId) {
      res.status(400).send({ message: "Candidate ID not provided" });
    }

    JobPostingDb.findByPk(jobId)
      .then((job) => {
        if (job) {
          CandidateDb.findOne({
            where: {
              id: candidateId,
              jobPostingId: jobId,
            },
          }).then((candidate) => {
            if (candidate) {
              if (nume) {
                if (nume.length >= 5) {
                  if (cv) {
                    if (cv.length >= 100) {
                      if (cv.length <= 255) {
                        if (email) {
                          if (
                            email.match(
                              "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
                            )
                          ) {
                            candidate.update(req.body);
                            res.status(202).send(candidate);
                          } else {
                            res.status(400).send({ message: "Invalid email!" });
                          }
                        } else {
                          res
                            .status(400)
                            .send({ message: "No email entered!" });
                        }
                      } else {
                        res.status(400).send({ message: "CV too long!" });
                      }
                    } else {
                      res.status(400).send({ message: "CV too short!" });
                    }
                  } else {
                    res.status(400).send({ message: "No cv entered!" });
                  }
                } else {
                  res.status(400).send({ message: "Name too short!" });
                }
              } else {
                res.status(400).send({ message: "No name entered!" });
              }
            } else {
              res.status(404).send({ message: "Candidate not found!" });
            }
          });
        } else {
          res.status(404).send({ message: "Job Posting not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  deleteCandidateFromJobPosting: async (req, res) => {
    const { jobId, candidateId } = req.params;
    if (!jobId) {
      res.status(400).send({ message: "Job Posting ID not provided" });
    }
    if (!candidateId) {
      res.status(400).send({ message: "Candidate ID not provided" });
    }

    JobPostingDb.findByPk(jobId)
      .then((job) => {
        if (job) {
          CandidateDb.findOne({
            where: {
              id: candidateId,
              jobPostingId: jobId,
            },
          }).then((candidate) => {
            if (candidate) {
              candidate.destroy();
              res.status(202).send({ message: "deleted" });
            } else {
              res.status(404).send({ message: "Candidate not found!" });
            }
          });
        } else {
          res.status(404).send({ message: "Job Posting not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  export: async (req, res) => {
    const result = [];
    for (let jp of await JobPostingDb.findAll()) {
      const jobPosting = {
        descriere: jp.descriere,
        deadline: jp.deadline,
        candidates: [],
      };
      for (let c of await CandidateDb.findAll({
        where: {
          jobPostingId: { [Op.eq]: jp.id },
        },
      })) {
        jobPosting.candidates.push({
          nume: c.nume,
          cv: c.cv,
          email: c.email,
        });
      }
      result.push(jobPosting);
    }
    if (result.length > 0) {
      res.json(result);
    } else {
      res.sendStatus(204);
    }
  },

  import: async (req, res, next) => {
    try {
      for (let jp of req.body) {
        const jobPosting = await JobPostingDb.create(jp);
        for (let c of jp.candidates) {
          jobPosting.createCandidate(c);
        }
        await jobPosting.save();
      }
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = controller;
