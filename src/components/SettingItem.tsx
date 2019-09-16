import * as React from "react";
import { Switch, TouchableOpacity, Linking } from "react-native";
import styled from "styled-components/native";
import { ThemeProps } from "../styles/theme";
import { default as styleTheme } from "../styles/theme";

const ItemRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 20px auto;
`;

const ItemText = styled.Text<ThemeProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${props => (props.theme === "dark" ? "#fff" : "#000")};
`;

interface ItemProps {
  onChange: () => void;
  value: any;
  color?: string;
}

const ItemSwitch: React.FC<ItemProps> = ({ value, onChange }) => (
  <Switch
    trackColor={{ false: null, true: styleTheme.colors.primary }}
    value={value}
    onValueChange={onChange}
  />
);

const ItemButton: React.FC<ItemProps> = ({ value, onChange }) => (
  <TouchableOpacity onPress={onChange}>
    <ItemText style={{ color: styleTheme.colors.secondary }}>{value}</ItemText>
  </TouchableOpacity>
);

interface SettingProps {
  theme: "light" | "dark";
  label: string;
  value: any;
  bool?: boolean;
  onChange?: () => void;
  link?: string;
}

export const StaticSetting: React.FC<SettingProps> = ({
  theme,
  label,
  value,
  link
}) => (
  <ItemRow>
    <ItemText theme={theme}>{label}</ItemText>
    <ItemText
      theme={theme}
      onPress={link ? () => Linking.openURL(link) : () => {}}
    >
      {value}
    </ItemText>
  </ItemRow>
);

const Setting: React.FC<SettingProps> = ({
  theme,
  label,
  value,
  bool,
  onChange
}) => (
  <ItemRow>
    <ItemText theme={theme}>{label}</ItemText>
    {bool ? (
      <ItemSwitch value={value} onChange={onChange} />
    ) : (
      <ItemButton value={value} onChange={onChange} />
    )}
  </ItemRow>
);

export default Setting;
