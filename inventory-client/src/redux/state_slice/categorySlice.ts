import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ICategory {
  _id?: string;
  userEmail?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TypeState {
  List: ICategory[] | null;
  ListTotal: number;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
};

export const brandSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    SetCategoryList: (state, action: PayloadAction<ICategory[]>) => {
      state.List = action.payload;
    },
    SetCategoryListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
  },
});

export const { SetCategoryList, SetCategoryListTotal } = brandSlice.actions;
export default brandSlice.reducer;
