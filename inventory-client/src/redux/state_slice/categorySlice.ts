import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ICategory {
  _id?: string;
  userEmail?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}
interface InputChangePayload {
  name: keyof ICategory;
  value: string;
}
interface TypeState {
  List: ICategory[] | null;
  ListTotal: number;
  FormValue: ICategory;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
  FormValue: {
    name: '',
  },
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
    OnChangeCategoryInput: (state, action: PayloadAction<InputChangePayload>) => {
      const { name, value } = action.payload;
      (state.FormValue as any)[name] = value;
    },
    ResetCategoryFormValue: state => {
      state.FormValue = {
        name: '',
      };
    },
  },
});

export const {
  SetCategoryList,
  SetCategoryListTotal,
  OnChangeCategoryInput,
  ResetCategoryFormValue,
} = brandSlice.actions;
export default brandSlice.reducer;
