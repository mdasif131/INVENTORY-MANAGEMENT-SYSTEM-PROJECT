import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export interface ISupplier{
  _id?: string;
  userEmail?: string;
  name?: string;
  address: string;
  phone: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
interface InputChangePayload {
  Name: keyof ISupplier;
  value: string;
}
interface TypeState {
  List: any[] | null;
  ListTotal: number;
  FormValue: ISupplier;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
  FormValue: {
    name: '',
    phone: '',
    email: '',
    address: '',
  },
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
     OnChangeSupplerInput: (
          state,
          action: PayloadAction<InputChangePayload>,
        ) => {
          state.FormValue[`${action.payload.Name}`] = action.payload.value;
        },
        ResetSupplerFormValue: (state) => {
        (Object.keys(state.FormValue) as Array<keyof typeof state.FormValue>).forEach(key => {
          state.FormValue[key] = '';
        });
    
        },
  },
});

export const {
  SetSupplierList,
  SetSupplierListTotal,
  OnChangeSupplerInput,
  ResetSupplerFormValue,
} = brandSlice.actions;
export default brandSlice.reducer;
