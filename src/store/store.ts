import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import typeViewReducer from "./slices/typeViewListSlice"; // Слайс для отображения
import clientLoadedReducer from "./slices/clientLoadedSlice"; // Новый слайс

export const store = configureStore({
  reducer: {
    viewTypeSlice: typeViewReducer, // Редьюсер для отображения
    clientLoaded: clientLoadedReducer, // Редьюсер для отслеживания загрузки клиента
  },
});

// Типы для использования в проекте
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
