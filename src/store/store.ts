import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import typeViewReducer from "./slices/typeViewListSlice";
import clientLoadedReducer from "./slices/clientLoadedSlice"; 
import screenSizeReducer from "./slices//screenSizeSlice";

export const store = configureStore({
  reducer: {
    viewTypeSlice: typeViewReducer, // Редьюсер для отображения
    clientLoaded: clientLoadedReducer, // Редьюсер для отслеживания загрузки клиента
    screenSize: screenSizeReducer,
  },
});

// Типы для использования в проекте
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
