import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";
import { VideoJsPlayerEvent } from "video.js";

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
        muted: true, // Ensures autoplay works
        controls: true,
        techOrder: ["youtube"],
        sources: [
          {
            src: streamUrl.split("v=")[1], // Extract the video ID
            type: "video/youtube",
          },
        ],
      });

      playerRef.current.on("ready", () => {
        console.log("Player is ready");
      });

      playerRef.current.on("error", (e: VideoJsPlayerEvent) => {
        console.error("Player error:", e);
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
      <video ref={videoRef} className="video-js vjs-default-skin" playsInline />
    </div>
  );
};

export default VideoPlayer;
