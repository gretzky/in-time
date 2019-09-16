import * as React from "react";
import styled from "styled-components/native";
import Icon from "./Icon";
import theme from "../styles/theme";

const StyledButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75;
  border-radius: 100;
  background-color: ${theme.colors.secondary};
`;

interface ButtonProps {
  icon?: string;
  children?: React.ReactNode;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, children, onPress }) => (
  <StyledButton onPress={onPress}>
    {icon ? <Icon name={icon} /> : children}
  </StyledButton>
);

export default Button;
