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
      playerRef.current = videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        techOrder: ["youtube"], // Specify YouTube as the tech
        sources: [
          {
            src: "wBVq_Qoegmo",
            //src: streamUrl.split("v=")[1], // Extracts the video ID from the full URL

            type: "video/youtube", // YouTube MIME type
          },
        ],
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [streamUrl]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
