import React, { useState, useEffect } from "react";
import "./Export.css";

const SERVER = "http://localhost:8080/api";
//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

const Export = () => {
  const [exportedText, setExportedText] = useState("");

  const exportFunction = async () => {
    const response = await fetch(`${SERVER}/jobPostings/export`);
    const data = await response.json();
    setExportedText(data);
  };

  useEffect(() => {
    exportFunction();
  }, []);

  return (
    <div className="export-container">
      <div className="export-text">
        <textarea
          readonly
          rows="20"
          cols="50"
          value={JSON.stringify(exportedText)}
        ></textarea>
      </div>
    </div>
  );
};

export default Export;
