import React, { useState } from "react";
import "./JobPostingForm.css";

const JobPostingForm = (props) => {
  const { onAdd } = props;
  const [descriere, setDescriere] = useState("");
  const [deadline, setDeadline] = useState("");

  const addJobPosting = (evt) => {
    onAdd({
      descriere,
      deadline,
    });
  };

  return (
    <div className="jobPosting-form">
      <div className="descriere">
        <input
          type="text"
          placeholder="descriere"
          onChange={(evt) => setDescriere(evt.target.value)}
        />
      </div>
      <div className="deadline">
        <input
          type="text"
          placeholder="deadline"
          onChange={(evt) => setDeadline(evt.target.value)}
        />
      </div>
      <div className="add">
        <input type="button" value="Add" onClick={addJobPosting} />
      </div>
    </div>
  );
};

export default JobPostingForm;
