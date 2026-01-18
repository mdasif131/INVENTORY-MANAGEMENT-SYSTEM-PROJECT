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

interface TypeState {
  List: ICustomer[] | null;
  ListTotal: number;
  FormValue: ICustomer;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
  FormValue: {
    customerName: 'MD AKIB',
    phone: '01706531351',
    email: 'akib.doe@example.com',
    address: '150 Main Street, BD',
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
  },
});

export const { SetCustomerList, SetCustomerListTotal } = brandSlice.actions;
export default brandSlice.reducer;
