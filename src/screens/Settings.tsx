import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { setTheme, setBeatsPerMeasure } from "../redux/actions";
import { ThemeProps } from "../styles/theme";
import Setting, { StaticSetting } from "../components/SettingItem";
import pkg from "../../app.json";

const Wrapper = styled.SafeAreaView<ThemeProps>`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.theme === "dark" ? "#000" : "#fff")};
  height: 100%;
  width: 100%;
`;

const Divider = styled.View`
  width: 90%;
  height: 2px;
  background-color: #ddd;
  margin: 10px auto;
`;

const Header = styled.Text<ThemeProps>`
  margin: 40px 0 20px 15px;
  font-size: 42px;
  font-weight: bold;
  color: ${props => (props.theme === "dark" ? "#fff" : "#000")};
`;

const Settings = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const beatsPerMeasure = useSelector(state => state.beatsPerMeasure);

  const handleTimeSignature = () => {
    dispatch(setBeatsPerMeasure(beatsPerMeasure === 4 ? 3 : 4));
  };

  return (
    <Wrapper theme={theme}>
      <Header theme={theme}>Settings</Header>
      <Setting
        theme={theme}
        label="Default time signature"
        value={`${beatsPerMeasure}/4`}
        onChange={handleTimeSignature}
      />
      <Setting
        bool
        theme={theme}
        label="Dark mode"
        value={theme === "dark"}
        onChange={() => dispatch(setTheme())}
      />
      <Divider />
      <StaticSetting
        theme={theme}
        label="App version"
        value={pkg.expo.version}
      />
      <StaticSetting
        theme={theme}
        label="Open GitHub Issue"
        value={<Feather name="external-link" size={25} />}
        link="https://github.com/gretzky/in-time/issues/new"
      />
    </Wrapper>
  );
};

export default Settings;
