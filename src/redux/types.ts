import { Audible } from "../types";

export interface SettingsState {
  beatsPerMeasure: number;
  bpm: number;
  metronomeAudible: Audible;
  counterAudible: Audible;
  theme: "dark" | "light";
}

export interface State {
  settings: SettingsState;
}

export enum ActionTypes {
  CHANGE_BEATS_PER_MEASURE = "CHANGE_BEATS_PER_MEASURE",
  CHANGE_BPM = "CHANGE_BPM",
  CHANGE_METRONOME_AUDIBLE = "CHANGE_METRONOME_AUDIBLE",
  CHANGE_COUNTER_AUDIBLE = "CHANGE_COUNTER_AUDIBLE",
  CHANGE_THEME = "CHANGE_THEME"
}
