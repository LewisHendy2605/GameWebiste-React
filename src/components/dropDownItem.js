import React from "react";
import "./dropDownItem.css";

const DropDownItem = ({ active }) => {
  const handleDestroyWebsite = () => {
    const confirmed = window.confirm(
      "Are you sure you want to destroy the website?"
    );
    if (confirmed) {
      alert("Nice Try"); // Replace with actual destructive action
    }
  };

  return (
    <div className={`dropDownItem ${active ? "active" : ""}`}>
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/lewis-hendy-6a9a952a7/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black" }}
          >
            LinkedIn
          </a>
        </li>
        <li>Settings</li>
        <li onClick={() => handleDestroyWebsite()}>Destroy Website</li>
      </ul>
    </div>
  );
};

export default DropDownItem;
