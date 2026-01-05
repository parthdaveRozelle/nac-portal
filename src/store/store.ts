import { configureStore } from "@reduxjs/toolkit";
import verificationReducer from "./verification/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import OrganizationPermissionInfo from "./permissions/slice";

const persistConfigOrganizationPermissionInfo = {
  key: "organizationPermissionInfo",
  storage,
};

const persistConfigVerificationReducer = {
  key: "verificationReducer",
  storage,
};

const persistedOrganizationPermissionReducer = persistReducer(
  persistConfigOrganizationPermissionInfo,
  OrganizationPermissionInfo
);

const persistVerificationReducer = persistReducer(
  persistConfigVerificationReducer,
  verificationReducer
);

export const store = configureStore({
  reducer: {
    verificationReducer: persistVerificationReducer,
    organizationPermission: persistedOrganizationPermissionReducer,
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
