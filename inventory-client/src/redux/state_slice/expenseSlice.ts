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
  name: 'expense',
  initialState,
  reducers: {
    SetExpenseList: (state, action: PayloadAction<any[]>) => {
      state.List = action.payload;
    },
    SetExpenseListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
  },
});

export const { SetExpenseList, SetExpenseListTotal } = brandSlice.actions;
export default brandSlice.reducer;
