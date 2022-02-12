import React, { useState } from "react";
import JobPostingList from "../JobPostingList/JobPostingList";
import "./JobPostingSort.css";

const JobPostingSort = () => {
  const [showJobPostings, setShowJobPostings] = useState(0);
  const [sort, setSort] = useState("");

  const options = [
    {
      label: "id",
      value: "id",
    },
    {
      label: "descriere",
      value: "descriere",
    },
    {
      label: "deadline",
      value: "deadline",
    },
  ];

  return (
    <>
      <div className="sort-container">
        {showJobPostings === 0 ? (
          <div className="sort-form">
            <div className="forSort">
              <select onChange={(evt) => setSort(evt.target.value)}>
                <option value="">Selecteaza atribut</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sort-confirm">
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
          <JobPostingList forSort={sort}></JobPostingList>
        )}
      </div>
    </>
  );
};

export default JobPostingSort;
