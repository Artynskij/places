import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IViewState {
  viewType: "list" | "table";
  viewData: { title: string; value: string; active: boolean }[];
}

const initialState: IViewState = {
  viewType: "list",
  viewData: [
    { title: "Список", value: "list", active: true },
    { title: "Таблица", value: "table", active: false },
  ],
};

const typeViewListSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setViewType: (state, action: PayloadAction<"list" | "table">) => {
      state.viewData = state.viewData.map((item) => {
        item.active = false;
        if (item.value === action.payload) {
          item.active = true;
        }
        return item;
      });
      state.viewType = action.payload;
    },
  },
});

export const { setViewType } = typeViewListSlice.actions;
export default typeViewListSlice.reducer;
