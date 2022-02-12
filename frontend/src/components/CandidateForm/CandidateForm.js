import React, { useState } from "react";
import "./CandidateForm.css";

const CandidateForm = (props) => {
  const { onAdd } = props;
  const [nume, setNume] = useState("");
  const [cv, setCv] = useState("");
  const [email, setEmail] = useState("");

  const addCandidate = (evt) => {
    console.warn("called");
    onAdd({
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
          onChange={(evt) => setNume(evt.target.value)}
        />
      </div>
      <div className="cv">
        <input
          type="text"
          placeholder="cv"
          onChange={(evt) => setCv(evt.target.value)}
        />
      </div>
      <div className="email">
        <input
          type="text"
          placeholder="email"
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <div className="add">
        <input type="button" value="add" onClick={addCandidate} />
      </div>
    </div>
  );
};

export default CandidateForm;
