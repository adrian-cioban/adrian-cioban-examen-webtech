import React from "react";
import "./JobPosting.css";

const JobPosting = (props) => {
  const { item, onDelete, onSelectEdit, onSelectCandidates } = props;

  return (
    <div className="jobPosting">
      <div className="id">{item.id}</div>
      <div
        className="descriere"
        style={{ cursor: "pointer" }}
        onClick={() => onSelectCandidates(item.id)}
      >
        <strong>{item.descriere}</strong>
      </div>
      <div className="deadline">{item.deadline}</div>
      <button
        onClick={() => {
          onDelete();
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          onSelectEdit(item.id);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default JobPosting;
