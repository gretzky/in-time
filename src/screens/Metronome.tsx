import * as React from "react";
import { Text, View, TextInput } from "react-native";
import useMetronome from "../hooks/useMetronome";
import Wrapper from "../components/Wrapper";
import Indicator from "../components/Indicator";
import Settings from "../components/Settings";

const Metronome = () => {
  const {
    setIsPlaying,
    isPlaying,
    setBpm,
    timeSignature,
    setTimeSignature,
    beatCount,
    handleAudible,
    audible,
    audibleIcon
  } = useMetronome();

  const handleTimeSignature = () =>
    timeSignature === 4 ? setTimeSignature(3) : setTimeSignature(4);

  return (
    <Wrapper>
      <Settings
        onTimeSignatureChange={handleTimeSignature}
        timeSignature={timeSignature}
        onAudibleChange={handleAudible}
        audible={audible}
        audibleIcon={audibleIcon}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TextInput
          style={{ fontSize: 120, fontWeight: "bold" }}
          keyboardType="number-pad"
          returnKeyType="done"
          defaultValue="100"
          onChangeText={(beat: any) => setBpm(beat)}
        />
        <Text style={{ fontStyle: "italic" }}>Tap to change</Text>
      </View>
      <Indicator beatCount={beatCount} timeSignature={timeSignature} />
    </Wrapper>
  );
};

export default Metronome;
