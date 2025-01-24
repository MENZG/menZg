import React from "react";
import MuxPlayer from "@mux/mux-player-react";

type MuxPlayerComponentProps = {
  playbackId: string;
  videoTitle?: string;
  viewerUserId?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
};

const MuxPlayerComponent: React.FC<MuxPlayerComponentProps> = ({
  playbackId,
  videoTitle = "Default Title",
  viewerUserId = "Default Viewer",
  primaryColor = "#ffffff",
  secondaryColor = "#000000",
  accentColor = "#fa50b5",
}) => {
  return (
    <MuxPlayer
      streamType="live"
      playbackId={playbackId}
      metadataVideoTitle={videoTitle}
      metadataViewerUserId={viewerUserId}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      accentColor={accentColor}
    />
  );
};

export default MuxPlayerComponent;
