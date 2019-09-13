import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import theme from "../styles/theme";

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onPress: () => void;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  isPlaying,
  onPress
}) => (
  <Button onPress={onPress}>
    <MaterialCommunityIcons
      name={isPlaying ? "pause" : "play"}
      size={30}
      color={theme.colors.white}
    />
  </Button>
);

export default PlayPauseButton;
