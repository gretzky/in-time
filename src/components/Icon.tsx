import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../styles/theme";

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name }) => (
  <MaterialCommunityIcons name={name} color={theme.colors.white} size={30} />
);

export default Icon;
