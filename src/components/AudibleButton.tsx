import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Button from "./Button";
import { Audible } from "../types";
import theme from "../styles/theme";

const InnerWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

interface AudibleButtonProps {
  onAudibleChange: () => void;
  audible: number;
  audibleIcon: string;
  color?: string;
}

const AudibleButton: React.FC<AudibleButtonProps> = ({
  onAudibleChange,
  audible,
  audibleIcon,
  color
}) => {
  return (
    <Button onPress={onAudibleChange}>
      {audible === Audible.BOTH ? (
        <InnerWrapper>
          <MaterialCommunityIcons
            name="music"
            color={color ? color : theme.colors.white}
            size={30}
          />
          <MaterialCommunityIcons
            name="vibrate"
            color={color ? color : theme.colors.white}
            size={30}
          />
        </InnerWrapper>
      ) : (
        <MaterialCommunityIcons
          name={audibleIcon}
          color={color ? color : theme.colors.white}
          size={30}
        />
      )}
    </Button>
  );
};

export default AudibleButton;
