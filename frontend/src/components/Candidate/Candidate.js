import React from "react";
import "./Candidate.css";

const Candidate = (props) => {
  const { item, onDelete, onSelectEdit } = props;

  return (
    <div className="candidate">
      <div className="id">{item.id}</div>
      <div className="nume">{item.nume}</div>
      <div className="cv">{item.cv}</div>
      <div className="email">{item.email}</div>
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

export default Candidate;
