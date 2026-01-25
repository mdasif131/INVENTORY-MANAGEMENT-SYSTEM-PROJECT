import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface TypeState {
  ExpenseSummaryList: any[] | null;
  SalesSummaryList: any[] | null;
  ReturnSummaryList: any[] | null;
  PurchaseSummaryList: any[] | null;

}

const initialState: TypeState = {
  ExpenseSummaryList: [],
  SalesSummaryList: [],
  ReturnSummaryList: [],
  PurchaseSummaryList: [],
};

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    SetExpenseSummaryList: (state, action: PayloadAction<any[]>) => {
      state.ExpenseSummaryList = action.payload;
    },
    SetSalesSummaryList: (state, action: PayloadAction<any[]>) => {
      state.SalesSummaryList = action.payload;
    },
    SetRetrunSummaryList: (state, action: PayloadAction<any[]>) => {
      state.ReturnSummaryList = action.payload;
    },
    SetPurchaseSummaryList: (state, action: PayloadAction<any[]>) => {
      state.PurchaseSummaryList = action.payload;
    },
   
  },
});

export const {
  SetExpenseSummaryList,
  SetSalesSummaryList,
  SetRetrunSummaryList,
  SetPurchaseSummaryList,
} = summarySlice.actions;
export default summarySlice.reducer;
