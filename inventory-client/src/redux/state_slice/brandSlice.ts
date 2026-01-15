import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Ibrand {
  _id?: string;
  userEmail?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TypeState {
  List: Ibrand[] | null;
  ListTotal: number;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
};

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    SetBrandList: (state, action: PayloadAction<Ibrand[]>) => {
      state.List = action.payload;
    },
    SetBrandListTotal: (state, action: PayloadAction<number>) => {
   state.ListTotal = action.payload;
 }
  },
});

export const { SetBrandList, SetBrandListTotal } = brandSlice.actions;
export default brandSlice.reducer;
