import { configureStore } from "@reduxjs/toolkit";
import { formBuilderApi } from "../api/formsbuilder.api";

const store = configureStore({
  reducer: {
    // groups:formBuilderApi.reducer
    forms: formBuilderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(formBuilderApi.middleware),
});
export default store;
