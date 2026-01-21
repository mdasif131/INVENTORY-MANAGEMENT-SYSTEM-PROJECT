import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TypeState {
  SalesByDateList: any[] | null;
  ExpenseByDateList: any[] | null;
  PurchaseByDateList: any[] | null;
  ReturnByDateList: any[] | null;
}

const initialState: TypeState = {
  SalesByDateList: [],
  ExpenseByDateList: [],
  PurchaseByDateList: [],
  ReturnByDateList: [],
  
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    SetExpenseByDateList: (state, action: PayloadAction<any[]>) => {
      state.ExpenseByDateList = action.payload;
    },
    SetSalesByDateListTotal: (state, action: PayloadAction<any[]>) => {
      state.SalesByDateList = action.payload;
    },
    SetPurchaseByDateListTotal: (state, action: PayloadAction<any[]>) => {
      state.PurchaseByDateList = action.payload;
    },
    SetReturnByDateListTotal: (state, action: PayloadAction<any[]>) => {
      state.ReturnByDateList = action.payload;
    },
  },
});

export const {
  SetSalesByDateListTotal,
  SetExpenseByDateList,
  SetPurchaseByDateListTotal,
  SetReturnByDateListTotal,
} = reportSlice.actions;
export default reportSlice.reducer;
