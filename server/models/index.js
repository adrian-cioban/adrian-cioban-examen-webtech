const Sequelize = require("sequelize");
const db = require("../config/db");
const JobPostingModel = require("./jobPosting");
const CandidateModel = require("./candidate");

const JobPosting = JobPostingModel(db, Sequelize);
const Candidate = CandidateModel(db, Sequelize);

JobPosting.hasMany(Candidate, {
  foreignKey: "jobPostingId",
  as: "Candidate",
  onDelete: "cascade",
});
Candidate.belongsTo(JobPosting);

module.exports = {
  JobPosting,
  Candidate,
  connection: db,
};
