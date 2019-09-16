import * as React from "react";
import { StatusBar } from "react-native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./src/AppNavigator";
import { store, persistor } from "./src/redux/store";

const AppContainer = () => {
  const theme = useSelector(state => state.theme);

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <AppNavigator />
    </>
  );
};

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);
