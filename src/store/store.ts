import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import exampleReducer from './slices/exampleSlice'; // Пример slice
import typeViewReducer from './slices/typeViewListSlice'
export const store = configureStore({
  reducer: {
    viewTypeSlice: typeViewReducer, // Добавляем редьюсеры сюда
  },
});

// Типы для использования в проекте
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;