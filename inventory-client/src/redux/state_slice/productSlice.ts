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
  name: 'product',
  initialState,
  reducers: {
    SetProdcutList: (state, action: PayloadAction<any[]>) => {
      state.List = action.payload;
    },
    SetProdcutListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
  },
});

export const { SetProdcutList, SetProdcutListTotal } =
  brandSlice.actions;
export default brandSlice.reducer;
