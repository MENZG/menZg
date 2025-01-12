import { useEffect } from "react";
import videojs from "video.js";

const VideoPlayer = ({
  streamUrl,
  autoplay = true,
  controls = true,
  preload = "auto",
}) => {
  const playerId = `video-player-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const player = videojs(playerId, {
      autoplay,
      controls,
      preload,
      sources: [
        {
          src: streamUrl,
          type: "application/x-mpegURL", // HLS
        },
      ],
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [streamUrl, playerId, autoplay, controls, preload]);

  return (
    <div data-vjs-player>
      <video id={playerId} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
