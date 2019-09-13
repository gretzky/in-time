import * as React from "react";
import styled from "styled-components";

const CountLabel = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const CountDisplay = styled.Text`
  font-size: 100px;
  font-weight: bold;
  margin: 0;
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
}

const Count: React.FC<CountProps> = ({ label, count }) => (
  <CountWrapper>
    <CountDisplay>{count}</CountDisplay>
    <CountLabel>{label}</CountLabel>
  </CountWrapper>
);

export default Count;
