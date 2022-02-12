import React, { useState } from "react";
import "./Import.css";

const SERVER = "http://localhost:8080/api";
//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

const Import = () => {
  const [textToImport, setTextToImport] = useState("");

  const importFunction = async (text) => {
    if (textToImport.length === 0) {
      alert("Introduceti datele!");
    } else {
      await fetch(`${SERVER}/jobPostings/import`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: text,
      });
      alert("Import cu succes!");
    }
  };

  return (
    <div className="import-container">
      <div className="import-form">
        <div>
          <textarea
            id="import"
            name="import"
            rows="20"
            cols="50"
            onChange={(evt) => setTextToImport(evt.target.value)}
          ></textarea>
        </div>
        <div className="import">
          <input
            type="button"
            value="Import"
            onClick={() => {
              importFunction(textToImport);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Import;
