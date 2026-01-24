import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ISaleFormValue {
  customerID: string;
  vatTax: number | null;
  discount: number | null;
  otherCost: number | null;
  shippingCost: number | null;
  grandTotal: number | null;
  note: string
}
interface InputChangePayload {
  name: keyof ISaleFormValue;
  value: string | number;
}
interface TypeState {
  List: any[] | null;
  ListTotal: number;
  CustomerDropDown: any[] | null;
  ProductDropDown: any[] | null;
  SaleFormValue: ISaleFormValue;
  SaleItemList: any[] | null;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
  CustomerDropDown: [],
  ProductDropDown: [],
  SaleFormValue: {
    customerID: "",
    vatTax: 0,
    discount: 0,
    otherCost: 0,
    shippingCost: 0,
    grandTotal: 0,
    note: "",
  },
  SaleItemList:[]
};

export const brandSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    SetSaleList: (state, action: PayloadAction<any[]>) => {
      state.List = action.payload;
    },
    SetSaleListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
    SetCustomerDropDown: (state, action) => {
      state.CustomerDropDown = action.payload;
    },
    SetProductDropDown: (state, action) => {
      state.ProductDropDown = action.payload;
    },
    SetSaleItemList: (state, action) => {
      state.SaleItemList?.push(action.payload)
    },
    RemoveSaleItem: (state, action) => {
      state.SaleItemList?.splice(action.payload, 1)
    }
    ,
    OnChangeSalesInput: (state, action: PayloadAction<InputChangePayload>) => {
          const { name, value } = action.payload;
          (state.SaleFormValue as any)[name] = value;
    },
  },
});

export const {
  SetSaleList,
  SetSaleListTotal,
  SetCustomerDropDown,
  SetProductDropDown,
  OnChangeSalesInput,
  SetSaleItemList,
  RemoveSaleItem,
} = brandSlice.actions;
export default brandSlice.reducer;
