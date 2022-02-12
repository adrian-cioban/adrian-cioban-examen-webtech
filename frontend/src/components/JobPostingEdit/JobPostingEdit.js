import React, { useState, useEffect } from "react";

const JobPostingEdit = (props) => {
  const { item, onCancel, onEdit } = props;
  const [id, setId] = useState(0);
  const [descriere, setDescriere] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    setId(item.id);
    setDescriere(item.descriere);
    setDeadline(item.deadline);
  }, []);

  const editJobPosing = (evt) => {
    onEdit({
      id,
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
          value={descriere}
          onChange={(evt) => setDescriere(evt.target.value)}
        />
      </div>
      <div className="deadline">
        <input
          type="text"
          placeholder="deadline"
          value={deadline}
          onChange={(evt) => setDeadline(evt.target.value)}
        />
      </div>
      <div className="edit">
        <input type="button" value="Confirm" onClick={editJobPosing} />
      </div>
      <div className="back">
        <input type="button" value="Back" onClick={() => onCancel()} />
      </div>
    </div>
  );
};

export default JobPostingEdit;
