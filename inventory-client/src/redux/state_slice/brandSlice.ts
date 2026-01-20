import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Ibrand {
  _id?: string;
  userEmail?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}
interface InputChangePayload {
  name: keyof Ibrand;
  value: string;
}
interface TypeState {
  List: Ibrand[] | null;
  ListTotal: number;
  FormValue: Ibrand;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
  FormValue: {
    name: '',
  },
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
    },
    OnChangeBrandInput: (state, action: PayloadAction<InputChangePayload>) => {
      const { name, value } = action.payload;
      (state.FormValue as any)[name] = value;
    },
    ResetBrandFormValue: state => {
      state.FormValue = {
        name: '',
      };
    },
  },
});

export const {
  SetBrandList,
  SetBrandListTotal,
  OnChangeBrandInput,
  ResetBrandFormValue,
} = brandSlice.actions;
export default brandSlice.reducer;
