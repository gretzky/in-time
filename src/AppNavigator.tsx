import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import Metronome from "./screens/Metronome";
import Counter from "./screens/Counter";
import Settings from "./screens/Settings";

const NavigatorTabs = createMaterialTopTabNavigator(
  {
    Settings: { screen: Settings },
    Metronome: { screen: Metronome },
    Counter: { screen: Counter }
  },
  {
    initialRouteName: "Metronome",
    animationEnabled: true,
    tabBarComponent: () => null
  }
);

export default createAppContainer(NavigatorTabs);
