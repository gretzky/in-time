import * as React from "react";
import styled from "styled-components";
import Button from "./Button";
import theme from "../styles/theme";

const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: 24px;
  font-weight: bold;
`;

interface TimeSignatureButton {
  onPress: () => void;
  timeSignature: number;
}

const TimeSignatureButton = ({ onPress, timeSignature }) => (
  <Button onPress={onPress}>
    <ButtonText>{timeSignature}/4</ButtonText>
  </Button>
);

export default TimeSignatureButton;
