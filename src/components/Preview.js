import React, { useState } from "react";
import "./Preview.css";
const PreviewScreen = ({ handleSubmit }) => {
  const [userName, setUserName] = useState("");
  return (
    <div className="container">
      <h1 className="title">Enter your name to join a video call</h1>
      <div className="form-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(userName);
          }}
        >
          <div className="input-container">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              name="userName"
              className="input"
              placeholder="Name"
              required
            />
          </div>
          <div className="button-container">
            <button className="button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreviewScreen;
