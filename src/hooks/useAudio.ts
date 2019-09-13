import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import debounce from "lodash.debounce";
import { Audible } from "../types";

const useAudio = (isMetronome: boolean) => {
  const [timeSignature, setTimeSignature] = useState<number>(4);
  const [strongBeat, setStrongBeat] = useState<any>(null);
  const [weakBeat, setWeakBeat] = useState<any>(null);
  const [audible, setAudible] = useState<Audible>(
    isMetronome ? Audible.SOUND : Audible.HAPTIC
  );
  const [audibleCount, setAudibleCount] = useState<number>(isMetronome ? 2 : 1);
  const [audibleIcon, setAudibleIcon] = useState<string>("null");
  const [beatCount, setBeatCount] = useState<number>(0);

  /**
   * loadStrongBeat - load the strong beat mp3
   */
  const loadStrongBeat = async () => {
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
  const loadWeakBeat = async () => {
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
   * handleChangeTimeSignature - debounced helper to change the beats per measure after 500 millis (to avoid abruptly changing the metronome if playing)
   */
  const handleChangeTimeSignature = debounce(newTimeSignature => {
    if (newTimeSignature && !isNaN(newTimeSignature)) {
      setTimeSignature(parseInt(newTimeSignature, 10));
    } else {
      setTimeSignature(4);
    }
  }, 500);

  /**
   * handleBeat - helper that handles playing the correct beat/haptic based on audible settings and whether or not we're on the first beat
   */
  const handleBeat = () => {
    if (beatCount % timeSignature === 0) {
      // these if/elses for each audible isn't ideal
      // but because both the sound and haptic are loaded async
      // we need to be explicit about when/where these are handled
      if (audible === Audible.SOUND) {
        strongBeat.replayAsync();
      } else if (audible === Audible.HAPTIC) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else if (audible === Audible.BOTH) {
        strongBeat.replayAsync();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
    } else {
      if (audible === Audible.SOUND) {
        weakBeat.replayAsync();
      } else if (audible === Audible.HAPTIC) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else if (audible === Audible.BOTH) {
        weakBeat.replayAsync();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }

    // increment the beat counter
    setBeatCount((beatCount + 1) % timeSignature);
  };

  /**
   * handleAudible - set audible count number based on which screen we're in
   */
  const handleAudible = () => {
    // we have 4 audible options, so reset the counter when we've hit 4
    const num = isMetronome ? 3 : 4;
    setAudibleCount(audibleCount === num ? 1 : audibleCount + 1);
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    loadStrongBeat();
    loadWeakBeat();
  }, []);

  useEffect(() => {
    if (!isMetronome) {
      if (audibleCount === 4) {
        setAudible(Audible.NONE);
        setAudibleIcon("volume-mute");
      }
    }
    if (audibleCount === 1) {
      setAudible(Audible.HAPTIC);
      setAudibleIcon("vibrate");
    } else if (audibleCount === 2) {
      setAudible(Audible.SOUND);
      setAudibleIcon("music");
    } else if (audibleCount === 3) {
      setAudible(Audible.BOTH);
    }
  }, [audibleCount]);

  return {
    beatCount,
    setBeatCount,
    timeSignature,
    setTimeSignature: handleChangeTimeSignature,
    handleBeat,
    handleAudible,
    audibleIcon,
    audible
  };
};

export default useAudio;
