import * as React from "react";
import styled from "styled-components/native";
import Button from "./Button";
import Icon from "./Icon";
import { Audible } from "../types";
import theme from "../styles/theme";

const ToolbarWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: 24px;
  font-weight: bold;
`;

const InnerWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

interface ToolbarProps {
  onBeatsPerMeasureChange: () => void;
  beatsPerMeasure: number;
  onAudibleChange: () => void;
  audible: Audible;
  audibleIcon: string;
  showReset?: boolean;
  onReset?: () => void;
  onPlayPause?: () => void;
  isPlaying?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onBeatsPerMeasureChange,
  beatsPerMeasure,
  onAudibleChange,
  audible,
  audibleIcon,
  showReset,
  onReset,
  onPlayPause,
  isPlaying
}) => {
  return (
    <ToolbarWrapper>
      {showReset ? (
        <Button onPress={onReset} icon="refresh" />
      ) : (
        <Button onPress={onPlayPause} icon={isPlaying ? "pause" : "play"} />
      )}
      <Button onPress={onAudibleChange}>
        {audible === Audible.BOTH ? (
          <InnerWrapper>
            <Icon name="music" />
            <Icon name="vibrate" />
          </InnerWrapper>
        ) : (
          <Icon name={audibleIcon} />
        )}
      </Button>
      <Button onPress={onBeatsPerMeasureChange}>
        <ButtonText>{beatsPerMeasure}/4</ButtonText>
      </Button>
    </ToolbarWrapper>
  );
};

export default Toolbar;
