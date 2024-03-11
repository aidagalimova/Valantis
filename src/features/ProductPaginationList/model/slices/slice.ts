import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState = {
  offset: 0,
  limit: 100,
};

const productPaginationSlice = createSlice({
  name: "productPagination",
  initialState,
  reducers: {
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset += action.payload;
    },
    resetOffset: (state) => {
      state.offset = 0;
    },
  },
});

export const { setOffset, resetOffset } = productPaginationSlice.actions;
export default productPaginationSlice.reducer;
