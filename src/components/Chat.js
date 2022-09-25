import React, { useRef, useState } from "react";
import "./Chat.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAMl6ASedYMrTrKdJPqqXeUNT_R14U8XmY",
  authDomain: "tutor-app-abe9c.firebaseapp.com",
  projectId: "tutor-app-abe9c",
  storageBucket: "tutor-app-abe9c.appspot.com",
  messagingSenderId: "748869803367",
  appId: "1:748869803367:web:2625314fdd3bc5aec963c2"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function Chat() {
  let history = useHistory();
  const [user] = useAuthState(auth);
  const meetingHandler = () => {
    history.push("/call");
  };
  return (
    <div className="chat-body">
      <h1 className="chat-h1">
        Welcome to the Chat Room. You can join a meeting by clicking the button
      </h1>
      <div className="chat-controls">
        <button className="chat-controls-btn-join" onClick={meetingHandler}>
          Join Meeting
        </button>
        <SignOut />
      </div>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="chat-controls-btn-sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}

function SignOut() {
  let history = useHistory();
  const signOutMoveHandler = () => {
    history.push("/");
    auth.signOut();
  };
  return (
    auth.currentUser && (
      <button
        className="chat-controls-btn-sign-out"
        onClick={signOutMoveHandler}
      >
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        <div className="messages-container">
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>
        </div>
      </main>

      <form onSubmit={sendMessage}>
        <div className="message-container-control">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Message"
            className="message-input"
          />

          <button
            className="chat-enter-btn"
            type="submit"
            disabled={!formValue}
          >
            Enter
          </button>
        </div>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img className="chat-image" src={photoURL} alt="photo" />
        <p className="chat-text">{text}</p>
      </div>
    </>
  );
}

export default Chat;
