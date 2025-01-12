import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube"; // Import the YouTube plugin
import "video.js/dist/video-js.css";

type VideoJsPlayer = ReturnType<typeof videojs>;

interface VideoPlayerProps {
  streamUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      console.log("Initializing video.js on:", videoRef.current);
      playerRef.current = videojs(videoRef.current, {
        autoplay: true,
        muted: true,
        controls: true,
        techOrder: ["youtube"],
        sources: [
          {
            src: streamUrl.split("v=")[1], // Extract video ID from URL
            type: "video/youtube",
          },
        ],
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    } else {
      console.error("videoRef.current is null");
    }
  }, [streamUrl]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
