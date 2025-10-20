import {
  type Action,
  type Reducer,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { LOGOUT } from "./actions/types";
import { ReduxSlices } from "@/types/enums";
import authReducer, { initialAuthState } from "./reducers/auth.reducer";
import userReducer, { initialUserState } from "./reducers/user.reducer";

const persistConfig = {
  key: "meal-mate-root",
  storage,
  whitelist: [ReduxSlices.User, ReduxSlices.Auth],
};

const combinedReducer = combineReducers({
  [ReduxSlices.User]: userReducer,
  [ReduxSlices.Auth]: authReducer,
});

const rootReducer: Reducer = (state, action: Action) => {
  if (action.type === LOGOUT) {
    localStorage.removeItem("persist:meal-mate-root");
    return combinedReducer(
      {
        [ReduxSlices.User]: initialUserState,
        [ReduxSlices.Auth]: initialAuthState,
      },
      action
    );
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(import.meta.env.MODE === "development" ? [logger] : []),
  devTools: import.meta.env.MODE === "development",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

export const getAccessToken = (state: RootState): string | null => {
  const auth = state[ReduxSlices.Auth];
  return auth?.token || null;
};
