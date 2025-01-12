import { useEffect } from "react";
import videojs from "video.js";

const VideoPlayer = ({ streamUrl }) => {
  useEffect(() => {
    const player = videojs("video-player", {
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
      if (player) {
        player.dispose();
      }
    };
  }, [streamUrl]);

  return (
    <div data-vjs-player>
      <video id="video-player" className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
