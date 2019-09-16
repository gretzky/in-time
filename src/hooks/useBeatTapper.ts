import { useState, useEffect } from "react";
import { Linking } from "react-native";
import useAudio from "./useAudio";

const useBeatTapper = () => {
  const [timeStart, setTimeStart] = useState<number>(null);
  const [timeBetween, setTimeBetween] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [resetTime, setResetTime] = useState<number>(8000);
  const {
    setBeatCount,
    handleBeat,
    audible,
    audibleIcon,
    handleAudible,
    setBeatsPerMeasure
  } = useAudio();

  /**
   * handleReset - reset all counters
   */
  const handleReset = (): void => {
    setBpm(0.0);
    setTimeBetween(null);
    setCount(0);
    setBeatCount(1);
  };

  /**
   * handleTap - calculate bpm and increment count number on screen tap
   */
  const handleTap = (): void => {
    const now: number = new Date().getTime();
    if (!count || now - timeStart > resetTime) {
      setTimeStart(now);
      setTimeBetween(1);
      setCount(1);
    } else {
      setTimeBetween(now - timeStart);
      if (timeBetween < 150) return;
      const latestBpm = 60000 / timeBetween;
      setTimeStart(now);
      setBpm(Math.round((bpm * (count - 1) + latestBpm) / count));
      setCount(count + 1);
    }
    handleBeat();
  };

  // tap handler
  useEffect((): void => Linking.addEventListener("keyup", () => handleTap()));

  return {
    tapBpm: bpm,
    handleTap,
    handleReset,
    tapCount: count,
    setBeatsPerMeasure,
    audible,
    handleAudible,
    audibleIcon
  };
};

export default useBeatTapper;
