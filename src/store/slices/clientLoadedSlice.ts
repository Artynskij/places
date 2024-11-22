import { createSlice } from "@reduxjs/toolkit";

interface IClientState {
  isClientLoaded: boolean; // Флаг, указывающий, загружен ли клиент
}

const initialState: IClientState = {
  isClientLoaded: false, // По умолчанию клиент не загружен
};

const clientLoadedSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientLoaded: (state) => {
      state.isClientLoaded = true; // Устанавливаем флаг при загрузке клиента
    },
  },
});

export const { setClientLoaded } = clientLoadedSlice.actions; // Экспортируем action
export default clientLoadedSlice.reducer; // Экспортируем reducer
