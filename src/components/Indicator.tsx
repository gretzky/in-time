import * as React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 50px;
`;

const Button = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 100;
  background-color: ${props =>
    props.active ? theme.colors.primary : theme.colors.secondary};
  box-shadow: ${props =>
    props.active
      ? "0px 0px 5px rgba(0,0,0,0.05)"
      : "0px 0px 0px rgba(0,0,0,0.01)"};
`;

interface IndicatorProps {
  beatCount: number;
  beatsPerMeasure: number;
}

const Indicator: React.FC<IndicatorProps> = ({
  beatCount,
  beatsPerMeasure
}) => (
  <Wrapper>
    <Button active={beatCount === 1} />
    <Button active={beatCount === 2} />
    {beatsPerMeasure === 4 ? <Button active={beatCount === 3} /> : null}
    <Button active={beatCount === 0} />
  </Wrapper>
);

export default Indicator;
