import { ActionTypes } from "./types";
import { Audible } from "../types";

export const setBeatsPerMeasure = (beatsPerMeasure: number) => ({
  type: ActionTypes.CHANGE_BEATS_PER_MEASURE,
  payload: beatsPerMeasure
});

export const setBpm = (bpm: number) => ({
  type: ActionTypes.CHANGE_BPM,
  payload: bpm
});

export const setMetronomeAudible = (audible: Audible) => ({
  type: ActionTypes.CHANGE_METRONOME_AUDIBLE,
  payload: audible
});

export const setCounterAudible = (audible: Audible) => ({
  type: ActionTypes.CHANGE_COUNTER_AUDIBLE,
  payload: audible
});

export const setTheme = () => ({
  type: ActionTypes.CHANGE_THEME
});
