import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import { api } from "./services/api";
import { listenerMiddleware, testStart } from "../middleware/auth";
import employees from "../features/employees/employeesSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// middleware Опция в configureStore принимает функцию обратного вызова,
// и этот обратный вызов будет указан getDefaultMiddleware в качестве ее аргумента:

// ! уточнить как работает middleware
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: auth,
    employees: employees,
  },
  middleware: (getDefaultMiddleware) => {
    console.log(1);
    return getDefaultMiddleware()
      .prepend(testStart.middleware)
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware);
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
