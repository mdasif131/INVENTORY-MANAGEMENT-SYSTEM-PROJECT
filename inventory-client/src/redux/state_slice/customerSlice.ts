import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ICustomer {
  _id?: string;
  userEmail?: string;
  customerName?: string;
  address: string;
  phone: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
interface InputChangePayload {
  Name: keyof ICustomer; 
  value: string;
}
interface TypeState {
  List: ICustomer[] | null;
  ListTotal: number;
  FormValue: ICustomer;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
  FormValue: {
    customerName: '',
    phone: '',
    email: '',
    address: '',
  },
};

export const brandSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    SetCustomerList: (state, action: PayloadAction<ICustomer[]>) => {
      state.List = action.payload;
    },
    SetCustomerListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
    OnChangeCustomerInput: (
      state,
      action: PayloadAction<InputChangePayload>,
    ) => {
      state.FormValue[`${action.payload.Name}`] = action.payload.value;
    },
    ResetFormValue: (state) => {
    (Object.keys(state.FormValue) as Array<keyof typeof state.FormValue>).forEach(key => {
      state.FormValue[key] = '';
    });

    },
  },
});

export const {
  SetCustomerList,
  SetCustomerListTotal,
  OnChangeCustomerInput,
  ResetFormValue,
} = brandSlice.actions;
export default brandSlice.reducer;
