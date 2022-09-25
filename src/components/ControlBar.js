import React from "react";
import "./ControlBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophoneSlash,
  faMicrophone,
  faVideo,
  faVideoSlash,
  faUserPlus,
  faArrowUpRightFromSquare,
  faMessage,
  faFaceSmile,
  faGear,
  faEllipsis
} from "@fortawesome/free-solid-svg-icons";
import {
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled
} from "@100mslive/hms-video-react";

const ControlBar = () => {
  const hmsActions = useHMSActions();
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };
  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  return (
    <div className="controlBar-container">
      <div className="camera-container">
        <div className="main-controls-nav">
          {isLocalAudioEnabled ? (
            <>
              <FontAwesomeIcon
                onClick={toggleAudio}
                className="Enable-mic"
                icon={faMicrophone}
                size="lg"
              />
            </>
          ) : (
            <>
              <FontAwesomeIcon
                onClick={toggleAudio}
                className="Disable-mic"
                icon={faMicrophoneSlash}
              />
            </>
          )}
          {isLocalVideoEnabled ? (
            <>
              <FontAwesomeIcon
                size={30}
                onClick={toggleVideo}
                className="Enable-video"
                icon={faVideo}
              />
            </>
          ) : (
            <>
              <FontAwesomeIcon
                className="Disable-video"
                onClick={toggleVideo}
                icon={faVideoSlash}
              />
            </>
          )}

          <button
            className="LeaveRoom"
            onClick={() => {
              hmsActions.leave();
            }}
          >
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
