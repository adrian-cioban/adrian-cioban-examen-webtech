import React, { useState, useEffect } from "react";
import Candidate from "../Candidate/Candidate";
import CandidateEdit from "../CandidateEdit/CandidateEdit";
import CandidateForm from "../CandidateForm/CandidateForm";
import "./CandidateList.css";

const SERVER = "http://localhost:8080/api";
//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

const CandidateList = (props) => {
  const { jobPostingId, onCancel } = props;
  const [candidates, setCandidates] = useState([]);
  const [selectedEdit, setSelectedEdit] = useState(0);

  const getCandidates = async () => {
    const response = await fetch(
      `${SERVER}/jobPostings/${jobPostingId}/candidates`
    );
    const data = await response.json();
    setCandidates(data);
  };

  const addCandidate = async (candidate) => {
    if (candidate.nume.length < 5) {
      alert("Nume prea scurt!");
    } else if (candidate.cv.length < 100) {
      alert("CV prea scurt!");
    } else if (candidate.cv.length > 255) {
      alert("CV prea lung!");
    } else if (
      !candidate.email.match(
        "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
      )
    ) {
      alert("email invalid!");
    } else {
      await fetch(`${SERVER}/jobPostings/${jobPostingId}/candidates`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidate),
      });
      getCandidates();
    }
  };

  const editCandidate = async (candidate) => {
    if (candidate.nume.length < 5) {
      alert("Nume prea scurt!");
    } else if (candidate.cv.length < 100) {
      alert("CV prea scurt!");
    } else if (candidate.cv.length > 255) {
      alert("CV prea lung!");
    } else if (
      !candidate.email.match(
        "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
      )
    ) {
      alert("email invalid!");
    } else {
      await fetch(
        `${SERVER}/jobPostings/${jobPostingId}/candidates/${candidate.id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(candidate),
        }
      );
      setSelectedEdit(0);
      getCandidates();
    }
  };

  const deleteCandidate = async (id) => {
    console.log("stergere");
    await fetch(`${SERVER}/jobPostings/${jobPostingId}/candidates/${id}`, {
      method: "delete",
    });
    getCandidates();
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <>
      {selectedEdit !== 0 ? (
        <>
          <CandidateEdit
            onCancel={() => setSelectedEdit(0)}
            onEdit={editCandidate}
            item={candidates.find((e) => e.id === selectedEdit)}
          ></CandidateEdit>
        </>
      ) : (
        <div>
          <div className="candidate-back">
            <input type="button" value="Back" onClick={() => onCancel()} />
          </div>
          <div className="candidate-list">
            {candidates.map((e) => (
              <Candidate
                key={e.id}
                item={e}
                onDelete={() => deleteCandidate(e.id)}
                onSelectEdit={() => setSelectedEdit(e.id)}
              />
            ))}
            <CandidateForm onAdd={addCandidate} />
          </div>
        </div>
      )}
    </>
  );
};

export default CandidateList;
