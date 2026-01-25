import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export interface IReturnFormValue {
  customerID: string;
  vatTax: number | null;
  discount: number | null;
  otherCost: number | null;
  shippingCost: number | null;
  grandTotal: number | null;
  note: string;
}
interface InputChangePayload {
  name: keyof IReturnFormValue;
  value: string | number;
}
interface TypeState {
  List: any[] | null;
  ListTotal: number;
  ReturnFormValue: IReturnFormValue;
  ReturnItemList: any[] | null;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
  ReturnFormValue: {
    customerID: '',
    vatTax: 0,
    discount: 0,
    otherCost: 0,
    shippingCost: 0,
    grandTotal: 0,
    note: '',
  },
  ReturnItemList: [],
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

    SetReturnItemList: (state, action) => {
      state.ReturnItemList?.push(action.payload);
    },
    RemoveReturnItem: (state, action) => {
      state.ReturnItemList?.splice(action.payload, 1);
    },
    OnChangeReturnsInput: (state, action: PayloadAction<InputChangePayload>) => {
      const { name, value } = action.payload;
      (state.ReturnFormValue as any)[name] = value;
    },
  },
});

export const {
  SetReturnList,
  SetReturnListTotal,
  SetReturnItemList,
  RemoveReturnItem,
  OnChangeReturnsInput,
} = brandSlice.actions;
export default brandSlice.reducer;
