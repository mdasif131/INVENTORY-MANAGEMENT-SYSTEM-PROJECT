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
  name: 'supplier',
  initialState,
  reducers: {
    SetSupplierList: (state, action: PayloadAction<any[]>) => {
      state.List = action.payload;
    },
    SetSupplierListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
  },
});

export const { SetSupplierList, SetSupplierListTotal } = brandSlice.actions;
export default brandSlice.reducer;
