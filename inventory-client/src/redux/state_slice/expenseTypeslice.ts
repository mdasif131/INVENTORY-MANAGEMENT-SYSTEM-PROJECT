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
  name: 'expensetype',
  initialState,
  reducers: {
    SetExpenseTypeList: (state, action: PayloadAction<any[]>) => {
      state.List = action.payload;
    },
    SetExpenseTypeListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
  },
});

export const { SetExpenseTypeList, SetExpenseTypeListTotal } = brandSlice.actions;
export default brandSlice.reducer;
