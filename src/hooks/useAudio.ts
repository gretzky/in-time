import { useState, useEffect, useContext } from "react";
import { NavigationContext } from "react-navigation";
import { useSelector, useDispatch } from "react-redux";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import debounce from "lodash.debounce";
import { Audible } from "../types";
import { setBeatsPerMeasure } from "../redux/actions";

const useAudio = () => {
  const dispatch = useDispatch();

  const beatsPerMeasure = useSelector(state => state.beatsPerMeasure);
  const metronomeAudible = useSelector(state => state.metronomeAudible);
  const counterAudible = useSelector(state => state.counterAudible);

  const navigation = useContext(NavigationContext);

  // some settings are screen-specific
  const isMetronome = navigation.state.routeName === "Metronome";

  //const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [strongBeat, setStrongBeat] = useState<any>(null);
  const [weakBeat, setWeakBeat] = useState<any>(null);
  const [audible, setAudible] = useState<Audible>(
    isMetronome ? metronomeAudible : counterAudible
  );
  const [audibleCount, setAudibleCount] = useState<number>(isMetronome ? 2 : 1);
  const [audibleIcon, setAudibleIcon] = useState<string>("null");
  const [beatCount, setBeatCount] = useState<number>(0);

  // get the first (strong) beat if the remainder of beats in the measure is 0
  const firstBeat: boolean = beatCount % beatsPerMeasure === 0;

  /**
   * loadStrongBeat - load the strong beat mp3
   */
  const loadStrongBeat = async (): Promise<void> => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/hi.mp3")
      );
      setStrongBeat(sound);
    } catch (err) {
      throw new Error(err);
    }
  };

  /**
   * loadWeakBeat - load the weak beat mp3
   */
  const loadWeakBeat = async (): Promise<void> => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/low.mp3")
      );
      setWeakBeat(sound);
    } catch (err) {
      throw new Error(err);
    }
  };

  /**
   * handleChangeBeatsPerMeasure - debounced helper to change the beats per measure after 500 millis (to avoid abruptly changing the metronome if playing)
   */
  const handleChangeBeatsPerMeasure = debounce((newBeatsPerMeasure: number) => {
    if (newBeatsPerMeasure && !isNaN(newBeatsPerMeasure)) {
      dispatch(setBeatsPerMeasure(parseInt(newBeatsPerMeasure.toString(), 10)));
    } else {
      dispatch(setBeatsPerMeasure(4));
    }
  }, 500);

  /**
   * handleBeat - helper that handles playing the correct beat/haptic based on audible settings and whether or not we're on the first beat
   */
  const handleBeat = (): void => {
    switch (audible) {
      case Audible.SOUND:
        firstBeat ? strongBeat.replayAsync() : weakBeat.replayAsync();
        break;
      case Audible.HAPTIC:
        firstBeat
          ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case Audible.BOTH:
        firstBeat ? strongBeat.replayAsync() : weakBeat.replayAsync();
        firstBeat
          ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      default:
        return;
    }

    // increment the beat in the measure
    setBeatCount((beatCount + 1) % beatsPerMeasure);
  };

  /**
   * handleAudible - set audible count number based on which screen we're in
   */
  const handleAudibleCount = (): void => {
    // we have 4 audible options, so reset the counter when we've hit 4
    const numOptions: number = isMetronome ? 3 : 4;
    setAudibleCount(audibleCount === numOptions ? 1 : audibleCount + 1);
  };

  /**
   * handleAudibleEffects - set audible type and icon based on the current audible state
   */
  const handleAudibleEffects = (audible: Audible, icon?: string): void => {
    setAudible(audible);

    if (icon) {
      setAudibleIcon(icon);
    }
  };

  useEffect((): void => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true, // not sure how this actually works
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    loadStrongBeat();
    loadWeakBeat();
  }, []);

  useEffect((): void => {
    switch (audibleCount) {
      case 1:
        handleAudibleEffects(Audible.HAPTIC, "vibrate");
        break;
      case 2:
        handleAudibleEffects(Audible.SOUND, "music");
        break;
      case 3:
        handleAudibleEffects(Audible.BOTH);
        break;
      case 4:
        handleAudibleEffects(Audible.NONE, "volume-mute");
        break;
      default:
        return;
    }
  }, [audibleCount]);

  return {
    beatCount,
    setBeatCount,
    setBeatsPerMeasure: handleChangeBeatsPerMeasure,
    handleBeat,
    handleAudible: handleAudibleCount,
    audibleIcon,
    audible,
    setAudible,
    audibleCount
  };
};

export default useAudio;
