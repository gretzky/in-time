import * as React from "react";
import { Text, View, TextInput, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import useMetronome from "../hooks/useMetronome";
import Wrapper from "../components/Wrapper";
import Indicator from "../components/Indicator";
import Settings from "../components/Settings";
import { setTheme } from "../redux/actions";

const Metronome = () => {
  const {
    setIsPlaying,
    isPlaying,
    setBpm,
    setBeatsPerMeasure,
    beatCount,
    handleAudible,
    audible,
    audibleIcon
  } = useMetronome();

  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const beatsPerMeasure = useSelector(state => state.beatsPerMeasure);

  const handleBeatsPerMeasure = (): void =>
    beatsPerMeasure === 4 ? setBeatsPerMeasure(3) : setBeatsPerMeasure(4);

  return (
    <Wrapper theme={theme}>
      <Settings
        onBeatsPerMeasureChange={handleBeatsPerMeasure}
        beatsPerMeasure={beatsPerMeasure}
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
          style={{
            fontSize: 120,
            fontWeight: "bold",
            color: theme === "dark" ? "#fff" : "#000"
          }}
          keyboardType="number-pad"
          returnKeyType="done"
          defaultValue="100"
          onChangeText={(beat: any) => setBpm(beat)}
        />
        <Text
          style={{
            fontStyle: "italic",
            color: theme === "dark" ? "#fff" : "#000"
          }}
        >
          Tap to change
        </Text>
      </View>
      <Indicator beatCount={beatCount} beatsPerMeasure={beatsPerMeasure} />
    </Wrapper>
  );
};

export default Metronome;
