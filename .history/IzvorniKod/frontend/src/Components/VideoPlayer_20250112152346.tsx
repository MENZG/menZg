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
    const timeout = setTimeout(() => {
      if (videoRef.current) {
        console.log("Initializing video.js on:", videoRef.current);
        playerRef.current = videojs(videoRef.current, {
          autoplay: true,
          muted: true, // Helps with autoplay restrictions
          controls: true,
          techOrder: ["youtube"],
          sources: [
            {
              src: streamUrl.split("v=")[1], // Extract video ID from the URL
              type: "video/youtube",
            },
          ],
        });
      } else {
        console.error("videoRef.current is null during initialization");
      }
    }, 0); // Defer initialization to the next tick

    return () => {
      clearTimeout(timeout);
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [streamUrl]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        playsInline // Optional: prevents autoplay issues on mobile devices
      />
    </div>
  );
};

export default VideoPlayer;
