import { useState } from "react";
import debounce from "lodash.debounce";
import useInterval from "./useInterval";
import useAudio from "./useAudio";

const useMetronome = () => {
  const {
    audible,
    handleAudible,
    audibleIcon,
    handleBeat,
    timeSignature,
    setTimeSignature,
    beatCount
  } = useAudio(true);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(100);

  /**
   * handleChangeTimeSignature - debounced helper to change the bpm after 500 millis (to avoid abruptly changing the metronome if playing)
   */
  const handleChangeBpm = debounce(newBpm => {
    if (newBpm && !isNaN(newBpm)) {
      setBpm(parseInt(newBpm, 10));
    } else {
      setBpm(100);
    }
  }, 500);

  // convert bpm to millis
  const delay = (60 / Math.floor(bpm)) * 1000;

  // play the metronome sounds/haptics every designated bpm
  useInterval(
    () => {
      if (isPlaying) {
        handleBeat();
      }
    },
    isPlaying ? delay : null
  );

  return {
    isPlaying,
    setIsPlaying,
    bpm,
    setBpm: handleChangeBpm,
    timeSignature,
    setTimeSignature,
    beatCount,
    audible,
    handleAudible,
    audibleIcon
  };
};

export default useMetronome;
