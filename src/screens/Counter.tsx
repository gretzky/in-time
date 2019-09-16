import * as React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { useSelector } from "react-redux";
import useBeatTapper from "../hooks/useBeatTapper";
import Count from "../components/Count";
import Settings from "../components/Settings";
import Wrapper from "../components/Wrapper";

const Counter = () => {
  const {
    tapCount,
    handleReset,
    handleTap,
    tapBpm,
    setBeatsPerMeasure,
    audible,
    audibleIcon,
    handleAudible
  } = useBeatTapper();

  const theme = useSelector(state => state.theme);
  const beatsPerMeasure = useSelector(state => state.beatsPerMeasure);

  const handleBeatsPerMeasure = () =>
    beatsPerMeasure === 4 ? setBeatsPerMeasure(3) : setBeatsPerMeasure(4);

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <Wrapper theme={theme}>
        <Settings
          onBeatsPerMeasureChange={handleBeatsPerMeasure}
          beatsPerMeasure={beatsPerMeasure}
          onAudibleChange={handleAudible}
          audible={audible}
          audibleIcon={audibleIcon}
          showReset={true}
          onReset={handleReset}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <Count count={tapCount} label="Count" theme={theme} />
          <View style={{ marginTop: 20, marginBottom: 20 }} />
          <Count count={tapBpm} label="BPM" theme={theme} />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            color: theme === "dark" ? "#fff" : "#000"
          }}
        >
          Tap anywhere on the screen
        </Text>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default Counter;
