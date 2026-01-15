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
  name: 'return',
  initialState,
  reducers: {
    SetReturnList: (state, action: PayloadAction<any[]>) => {
      state.List = action.payload;
    },
    SetReturnListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
  },
});

export const { SetReturnList, SetReturnListTotal } = brandSlice.actions;
export default brandSlice.reducer;
