import { Reducer, AnyAction } from "redux";
import { SettingsState, ActionTypes } from "./types";
import { Audible } from "../types";

const initialState: SettingsState = {
  beatsPerMeasure: 4,
  bpm: 100,
  metronomeAudible: Audible.SOUND,
  counterAudible: Audible.HAPTIC,
  theme: "light"
};

const rootReducer: Reducer<SettingsState, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_BEATS_PER_MEASURE:
      return {
        ...state,
        beatsPerMeasure: action.payload
      };
    case ActionTypes.CHANGE_BPM:
      return {
        ...state,
        bpm: action.payload
      };
    case ActionTypes.CHANGE_METRONOME_AUDIBLE:
      return {
        ...state,
        metronomeAudible: action.payload
      };
    case ActionTypes.CHANGE_COUNTER_AUDIBLE:
      return {
        ...state,
        counterAudible: action.payload
      };
    case ActionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark"
      };
    default:
      return state;
  }
};

export default rootReducer;
