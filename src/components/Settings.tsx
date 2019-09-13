import * as React from "react";
import styled from "styled-components/native";
import AudibleButton from "./AudibleButton";
import TimeSignatureButton from "./TimeSignatureButton";
import ResetButton from "./ResetButton";
import PlayPauseButton from "./PlayPauseButton";
import { Audible } from "../types";

const SettingsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

interface SettingsProps {
  onTimeSignatureChange: () => void;
  timeSignature: number;
  onAudibleChange: () => void;
  audible: Audible;
  audibleIcon: string;
  showReset?: boolean;
  onReset?: () => void;
  onPlayPause?: () => void;
  isPlaying?: boolean;
}

const Settings: React.FC<SettingsProps> = ({
  onTimeSignatureChange,
  timeSignature,
  onAudibleChange,
  audible,
  audibleIcon,
  showReset,
  onReset,
  onPlayPause,
  isPlaying
}) => {
  return (
    <SettingsWrapper>
      {showReset ? (
        <ResetButton onReset={onReset} />
      ) : (
        <PlayPauseButton onPress={onPlayPause} isPlaying={isPlaying} />
      )}
      <AudibleButton
        onAudibleChange={onAudibleChange}
        audible={audible}
        audibleIcon={audibleIcon}
      />
      <TimeSignatureButton
        onPress={onTimeSignatureChange}
        timeSignature={timeSignature}
      />
    </SettingsWrapper>
  );
};

export default Settings;
