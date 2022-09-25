import React from "react";
import {
  useHMSActions,
  useHMSStore,
  selectCameraStreamByPeerID
} from "@100mslive/hms-video-react";
import "./VideoTile.css";
const VideoTile = ({ peer, isLocal }) => {
  const hmsActions = useHMSActions();
  const videoRef = React.useRef(null);
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));

  React.useEffect(() => {
    (async () => {
      console.log(videoRef.current);
      console.log(videoTrack);
      if (videoRef.current && videoTrack) {
        if (videoTrack.enabled) {
          await hmsActions.attachVideo(videoTrack.id, videoRef.current);
        } else {
          await hmsActions.detachVideo(videoTrack.id, videoRef.current);
        }
      }
    })();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoTrack]);
  return (
    <div className="video-container">
      <video
        className="video-camera"
        ref={videoRef}
        autoPlay={true}
        playsInline
        muted={true}
      ></video>
      <div className="name-container">
        <div className="name">{`${peer.name}`}</div>
      </div>
    </div>
  );
};

export default VideoTile;
