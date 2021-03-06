import styled from "styled-components/native";
import { ThemeProps } from "../styles/theme";

const Wrapper = styled.SafeAreaView<ThemeProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  background-color: ${props => (props.theme === "dark" ? "#000" : "#fff")};
`;

export default Wrapper;
