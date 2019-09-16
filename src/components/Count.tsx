import * as React from "react";
import styled from "styled-components";

const CountLabel = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => (props.theme === "dark" ? "#fff" : "#000")};
`;

const CountDisplay = styled.Text`
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

interface CountProps {
  label: string;
  count: number;
  theme: "light" | "dark";
}

const Count: React.FC<CountProps> = ({ label, count, theme }) => (
  <CountWrapper>
    <CountDisplay theme={theme}>{count}</CountDisplay>
    <CountLabel theme={theme}>{label}</CountLabel>
  </CountWrapper>
);

export default Count;
