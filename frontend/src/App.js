import "./App.css";
import React, { useState } from "react";
import JobPostingList from "./components/JobPostingList/JobPostingList";
import JobPostingFilter from "./components/JobPostingFilter/JobPostingFilter";
import JobPostingSort from "./components/JobPostingSort/JobPostingSort";
import Import from "./components/Import/Import";
import Export from "./components/Export/Export";

function App() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="navigationBar">
        <ul>
          <li>
            <button
              onClick={() => {
                setSelected(1);
              }}
            >
              Job Postings
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setSelected(2);
              }}
            >
              Job Postings Filtered
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setSelected(3);
              }}
            >
              Job Postings Sorted
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setSelected(4);
              }}
            >
              Import
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setSelected(5);
              }}
            >
              Export
            </button>
          </li>
        </ul>
      </div>
      {selected === 1 ? (
        <>
          <JobPostingList></JobPostingList>
        </>
      ) : selected === 2 ? (
        <>
          <JobPostingFilter></JobPostingFilter>
        </>
      ) : selected === 3 ? (
        <>
          <JobPostingSort></JobPostingSort>
        </>
      ) : selected === 4 ? (
        <>
          <Import></Import>
        </>
      ) : selected === 5 ? (
        <>
          <Export></Export>
        </>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default App;
