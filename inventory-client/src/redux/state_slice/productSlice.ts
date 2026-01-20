import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
interface InputChangePayload {
  name: keyof IProduct;
  value: string | number;
}
export interface IProduct {
  _id?: string;
  userEmail?: string;
  categoryID: string;
  brandID: string;
  name: string;
  unit: string;
  details?: string;
  createdAt?: string;
  updatedAt?: string;
}
interface TypeState {
  List: any[] | null;
  ListTotal: number;
  BrandDropDown: any[] | null;
  CategoryDropDown: any[] | null;
  FormValue: IProduct;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
  BrandDropDown: [],
  CategoryDropDown: [],
  FormValue: {
    categoryID: '',
    brandID: '',
    name: '',
    unit: '',
    details: '',
  },
};

export const brandSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    SetProdcutList: (state, action: PayloadAction<IProduct[]>) => {
      state.List = action.payload;
    },
    SetProdcutListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
    SetBrandDropDown: (state, action) => {
      state.BrandDropDown = action.payload;
    },
    SetCategoryDropDown: (state, action) => {
      state.CategoryDropDown = action.payload;
    },
    OnChangeProductInput: (
      state,
      action: PayloadAction<InputChangePayload>,
    ) => {
      const { name, value } = action.payload;
      (state.FormValue as any)[name] = value;
    },
    ResetProductFormValue: state => {
      state.FormValue = {
        categoryID: '',
        brandID: ' ',
        name: '',
        unit: '',
        details: '',
      };
    },
  },
});

export const {
  SetProdcutList,
  SetProdcutListTotal,
  SetBrandDropDown,
  ResetProductFormValue,
  SetCategoryDropDown,
  OnChangeProductInput,
} = brandSlice.actions;
export default brandSlice.reducer;
