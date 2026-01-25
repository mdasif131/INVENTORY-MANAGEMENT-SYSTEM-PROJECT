import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface IPurchaseFormValue {
  supplierID: string;
  vatTax: number | null;
  discount: number | null;
  otherCost: number | null;
  shippingCost: number | null;
  grandTotal: number | null;
  note: string;
}
interface InputChangePayload {
  name: keyof IPurchaseFormValue;
  value: string | number;
}
interface TypeState {
  List: any[] | null;
  ListTotal: number;
  SupplierDropDown: any[] | null;
  PurchaseFormValue: IPurchaseFormValue;
  PurchaseItemList: any[] | null;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
  SupplierDropDown: [],
  PurchaseFormValue: {
    supplierID: '',
    vatTax: 0,
    discount: 0,
    otherCost: 0,
    shippingCost: 0,
    grandTotal: 0,
    note: '',
  },
  PurchaseItemList: [],
};

export const brandSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    SetPurchaseList: (state, action: PayloadAction<any[]>) => {
      state.List = action.payload;
    },
    SetPurchaseListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
     SetSupplierDropDown: (state, action) => {
      state.SupplierDropDown = action.payload;
    },
    SetPurchaseItemList: (state, action) => {
      state.PurchaseItemList?.push(action.payload);
    },
    RemovePurchaseItem: (state, action) => {
      state.PurchaseItemList?.splice(action.payload, 1);
    },
    OnChangePurchasesInput: (
      state,
      action: PayloadAction<InputChangePayload>,
    ) => {
      const { name, value } = action.payload;
      (state.PurchaseFormValue as any)[name] = value;
    },
  },
});

export const {
  SetPurchaseList,
  SetPurchaseListTotal,
  SetPurchaseItemList,
  RemovePurchaseItem,
  OnChangePurchasesInput,
  SetSupplierDropDown,
} = brandSlice.actions;
export default brandSlice.reducer;
