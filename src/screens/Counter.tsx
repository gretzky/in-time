import * as React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
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
    timeSignature,
    setTimeSignature,
    audible,
    audibleIcon,
    handleAudible
  } = useBeatTapper();
  const handleTimeSignature = () =>
    timeSignature === 4 ? setTimeSignature(3) : setTimeSignature(4);

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <Wrapper>
        <Settings
          onTimeSignatureChange={handleTimeSignature}
          timeSignature={timeSignature}
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
          <Count count={tapCount} label="Count" />
          <View style={{ marginTop: 20, marginBottom: 20 }} />
          <Count count={tapBpm} label="BPM" />
        </View>
        <Text style={{ fontWeight: "bold" }}>Tap anywhere on the screen</Text>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default Counter;
