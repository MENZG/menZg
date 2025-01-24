import React, { useEffect, useRef } from "react";
import videojs from "video.js";

// Define the type for the video.js Player
type VideoJsPlayer = videojs.Player;

interface VideoPlayerProps {
  streamUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Initialize the video.js player
      playerRef.current = videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: streamUrl,
            type: "application/x-mpegURL", // HLS
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
