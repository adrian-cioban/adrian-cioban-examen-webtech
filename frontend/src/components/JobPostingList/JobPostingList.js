import React, { useState, useEffect } from "react";
import CandidateList from "../CandidateList/CandidateList";
import JobPosting from "../JobPosting/JobPosting";
import JobPostingEdit from "../JobPostingEdit/JobPostingEdit";
import JobPostingForm from "../JobPostingForm/JobPostingForm";
import "./JobPostingList.css";

const SERVER = "http://localhost:8080/api";
//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

const JobPostingList = (props) => {
  const { id, deadline, forSort } = props;
  const [jobPostings, setJobPostings] = useState([]);
  const [selectedEdit, setSelectedEdit] = useState(0);
  const [selectedCandidates, setSelectedCandidates] = useState(0);

  const getJobPostings = async () => {
    const response = await fetch(`${SERVER}/jobPostings`);
    const data = await response.json();
    setJobPostings(data);
  };

  const addJobPosting = async (jobPosting) => {
    if (jobPosting.descriere.length < 3) {
      alert("Descriere prea scurta!");
    } else if (jobPosting.deadline.length === 0) {
      alert("Introduceti deadline-ul!\nFormat: YYYY-MM-DDTHH:MM:SSZ");
    } else {
      await fetch(`${SERVER}/jobPostings`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobPosting),
      });
      getJobPostings();
    }
  };

  const editJobPosting = async (jobPosting) => {
    if (jobPosting.descriere.length < 3) {
      alert("Descriere prea scurta!");
    } else if (jobPosting.deadline.length === 0) {
      alert("Introduceti deadline-ul!\nFormat: YYYY-MM-DDTHH:MM:SSZ");
    } else {
      await fetch(`${SERVER}/jobPostings/${jobPosting.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobPosting),
      });
      setSelectedEdit(0);
      getJobPostings();
    }
  };

  const deleteJobPosting = async (id) => {
    console.log("stergere");
    await fetch(`${SERVER}/jobPostings/${id}`, {
      method: "delete",
    });
    getJobPostings();
  };

  const getJobPostingsFiltered = async () => {
    const response = await fetch(
      `${SERVER}/jobPostings/filter?id=${id}&deadline=${deadline}`
    );
    const data = await response.json();
    setJobPostings(data);
  };

  const getJobPostingsSorted = async () => {
    const response = await fetch(`${SERVER}/jobPostings/sort/${forSort}`);
    const data = await response.json();
    setJobPostings(data);
  };

  useEffect(() => {
    if (id && deadline) {
      getJobPostingsFiltered();
    } else if (forSort) {
      getJobPostingsSorted();
    } else {
      getJobPostings();
    }
  }, []);

  return (
    <div className="jobPosting-list">
      {selectedCandidates === 0 ? (
        <>
          {selectedEdit !== 0 ? (
            <>
              <JobPostingEdit
                onCancel={() => setSelectedEdit(0)}
                onEdit={editJobPosting}
                item={jobPostings.find((e) => e.id === selectedEdit)}
              ></JobPostingEdit>
            </>
          ) : (
            <>
              {jobPostings.map((e) => (
                <JobPosting
                  key={e.id}
                  item={e}
                  onDelete={() => deleteJobPosting(e.id)}
                  onSelectEdit={() => setSelectedEdit(e.id)}
                  onSelectCandidates={() => setSelectedCandidates(e.id)}
                />
              ))}
              <JobPostingForm onAdd={addJobPosting} />
            </>
          )}
        </>
      ) : (
        <>
          <CandidateList
            jobPostingId={
              jobPostings.find((e) => e.id === selectedCandidates).id
            }
            onCancel={() => setSelectedCandidates(0)}
          ></CandidateList>
        </>
      )}
    </div>
  );
};

export default JobPostingList;
