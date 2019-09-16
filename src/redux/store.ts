import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import * as SecureStore from "expo-secure-store";
import rootReducer from "./reducer";

// map SecureStorage methods to method names that redux-persist will look for
function createSecureStorage(options: any = {}): {} {
  const defaultReplacer = (key: string, replaceCharacter: string): string =>
    key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);

  const replaceCharacter: string = options.replaceCharacter || "_";
  const replacer: (key: string, replaceCharacter: string) => string =
    options.replacer || defaultReplacer;

  return {
    getItem: (key: string): Promise<string> =>
      SecureStore.getItemAsync(replacer(key, replaceCharacter), options),
    setItem: (key: string, value: any): Promise<void> =>
      SecureStore.setItemAsync(replacer(key, replaceCharacter), value, options),
    removeItem: (key: string): Promise<void> =>
      SecureStore.deleteItemAsync(replacer(key, replaceCharacter), options)
  };
}

const secureStorage = createSecureStorage();

const persistConfig: any = {
  key: "root",
  storage: secureStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };
