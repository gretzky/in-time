import styled from "styled-components/native";
import theme from "../styles/theme";

const Button = styled.TouchableHighlight`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75;
  border-radius: 100;
  background-color: ${theme.colors.secondary};
`;

export default Button;
