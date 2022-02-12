import React, { useState, useEffect } from "react";

const CandidateEdit = (props) => {
  const { item, onCancel, onEdit } = props;
  const [id, setId] = useState(0);
  const [nume, setNume] = useState("");
  const [cv, setCv] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setId(item.id);
    setNume(item.nume);
    setCv(item.cv);
    setEmail(item.email);
  }, []);

  const editCandidate = (evt) => {
    console.warn("called");
    onEdit({
      id,
      nume,
      cv,
      email,
    });
  };

  return (
    <div className="candidate-form">
      <div className="nume">
        <input
          type="text"
          placeholder="nume"
          value={nume}
          onChange={(evt) => setNume(evt.target.value)}
        />
      </div>
      <div className="cv">
        <input
          type="text"
          placeholder="cv"
          value={cv}
          onChange={(evt) => setCv(evt.target.value)}
        />
      </div>
      <div className="email">
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <div className="edit">
        <input type="button" value="Confirm" onClick={editCandidate} />
      </div>
      <div className="back">
        <input type="button" value="Back" onClick={() => onCancel()} />
      </div>
    </div>
  );
};

export default CandidateEdit;
