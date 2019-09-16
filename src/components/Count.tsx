import * as React from "react";
import styled from "styled-components";
import { ThemeProps } from "../styles/theme";

const CountLabel = styled.Text<ThemeProps>`
  font-size: 24px;
  font-weight: bold;
  color: ${props => (props.theme === "dark" ? "#fff" : "#000")};
`;

const CountDisplay = styled.Text<ThemeProps>`
  font-size: 100px;
  font-weight: bold;
  margin: 0;
  color: ${props => (props.theme === "dark" ? "#fff" : "#000")};
`;

const CountWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface CountProps extends ThemeProps {
  label: string;
  count: number;
}

const Count: React.FC<CountProps> = ({ label, count, theme }) => (
  <CountWrapper>
    <CountDisplay theme={theme}>{count}</CountDisplay>
    <CountLabel theme={theme}>{label}</CountLabel>
  </CountWrapper>
);

export default Count;
