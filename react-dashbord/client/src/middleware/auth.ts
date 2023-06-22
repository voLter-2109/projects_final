import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/auth";

export const listenerMiddleware = createListenerMiddleware();
console.log("🚀 ~ file: auth.ts:4 ~ listenerMiddleware:", listenerMiddleware);

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    console.log("middleware");
    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token);
    }
  },
});

export const testStart = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchRejected,
  effect: async (action, state) => {
    console.log("error");
  },
});
