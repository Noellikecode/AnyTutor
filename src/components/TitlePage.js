import React from "react";
import { useHistory } from "react-router-dom";
import "./TitlePage.css";
const TitlePage = () => {
  let history = useHistory();
  const chatHandlerMove = () => {
    history.push("./chat");
  };
  return (
    <div className="container4">
      <h1 className="h1">Any Tutor</h1>
      <h4 className="slogan">The Tutor App of the Future</h4>

      <p className="p">
        Having bad grades? Not really understanding anything at school? Our
        Tutor App will solve all of that, with tutors from all across the world,
        to help you with what you're struggling on.
      </p>
      <div className="title-image-container">
        <img
          className="title-image"
          src="https://www.thetutorteam.com/wp-content/uploads/2020/02/1571923135-hero2-1024x646.png"
          alt="tutor-image-1"
        ></img>
        <img
          className="title-image"
          src="https://fordhaminstitute.org/sites/default/files/styles/single_main_image/public/2020-07/ub-7-30-20.jpg?itok=3oEOpKU0"
          alt="tutor-image-2"
        />
        <img
          className="title-image"
          src="https://www.nymetroparents.com/columnpic2/tween-girl-online-tutoring.jpg"
          alt="tutor-image-3"
        />
      </div>
      <p className="p1">
        Enter the chat to receive one on one guidance from a tutor and improve
        your understanding.
      </p>
      <div className="btn-container">
        <button className="chat-btn" onClick={chatHandlerMove}>
          Enter Chat
        </button>
      </div>
    </div>
  );
};
export default TitlePage;
