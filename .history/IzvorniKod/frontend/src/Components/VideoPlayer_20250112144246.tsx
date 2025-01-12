import React, { useEffect, useRef } from "react";
import videojs from "video.js";

// Define fallback type for Player
type VideoJsPlayer = ReturnType<typeof videojs>;

interface VideoPlayerProps {
  streamUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Initialize the player
      playerRef.current = videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: streamUrl,
            type: "application/x-mpegURL",
          },
        ],
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose(); // Dispose player on unmount
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
