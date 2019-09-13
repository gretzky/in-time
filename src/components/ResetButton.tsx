import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import theme from "../styles/theme";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => (
  <Button onPress={onReset}>
    <MaterialCommunityIcons
      name="refresh"
      color={theme.colors.white}
      size={30}
    />
  </Button>
);

export default ResetButton;
