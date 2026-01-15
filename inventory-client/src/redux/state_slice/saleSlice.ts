import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TypeState {
  List: any[] | null;
  ListTotal: number;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
};

export const brandSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    SetSaleList: (state, action: PayloadAction<any[]>) => {
      state.List = action.payload;
    },
    SetSaleListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
  },
});

export const { SetSaleList, SetSaleListTotal } = brandSlice.actions;
export default brandSlice.reducer;
