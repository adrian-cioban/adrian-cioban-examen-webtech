import React, { useState } from "react";
import JobPostingList from "../JobPostingList/JobPostingList";
import "./JobPostingFilter.css";

const JobPostingFilter = () => {
  const [showJobPostings, setShowJobPostings] = useState(0);
  const [id, setId] = useState("");
  const [deadline, setDeadline] = useState("");

  return (
    <>
      <div className="filter-container">
        {showJobPostings === 0 ? (
          <div className="filter-form">
            <div className="id">
              <input
                type="text"
                placeholder="id"
                onChange={(evt) => setId(evt.target.value)}
              />
            </div>
            <div className="deadline">
              <input
                type="text"
                placeholder="deadline"
                onChange={(evt) => setDeadline(evt.target.value)}
              />
            </div>
            <div className="filter-confirm">
              <input
                type="button"
                value="Confirm"
                onClick={() => {
                  setShowJobPostings(1);
                }}
              />
            </div>
          </div>
        ) : (
          <JobPostingList id={id} deadline={deadline}></JobPostingList>
        )}
      </div>
    </>
  );
};

export default JobPostingFilter;
