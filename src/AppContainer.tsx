import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import Metronome from "./screens/Metronome";
import Counter from "./screens/Counter";

const NavigatorTabs = createMaterialTopTabNavigator(
  {
    Metronome: { screen: Metronome },
    Counter: { screen: Counter }
  },
  {
    initialRouteName: "Metronome",
    animationEnabled: true,
    tabBarComponent: () => null,
    style: {
      paddingTop: 40,
      backgroundColor: "#fff"
    }
  }
);

export default createAppContainer(NavigatorTabs);
