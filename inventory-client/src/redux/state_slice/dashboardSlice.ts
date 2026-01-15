import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define interfaces matching your backend response
export interface IChartData {
  _id: string;
  totalAmount: number;
}

export interface ITotalData {
  _id: number;
  totalAmount: number;
}

export interface IDashboardResponse {
  Total: ITotalData[];
  last30Days: IChartData[];
}

interface TypeState {
  ExpenseChart: IChartData[];
  PurchaseChart: IChartData[];
  ReturnChart: IChartData[];
  SaleChart: IChartData[];
  ExpenseTotal: number;
  SaleTotal: number;
  PurchaseTotal: number;
  ReturnTotal: number;
}

const initialState: TypeState = {
  ExpenseChart: [],
  PurchaseChart: [],
  ReturnChart: [],
  SaleChart: [],
  ExpenseTotal: 0,
  SaleTotal: 0,
  PurchaseTotal: 0,
  ReturnTotal: 0,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Individual Chart Setters
    SetExpenseChart: (state, action: PayloadAction<IChartData[]>) => {
      state.ExpenseChart = action.payload;
    },
    SetSaleChart: (state, action: PayloadAction<IChartData[]>) => {
      state.SaleChart = action.payload;
    },
    SetPurchaseChart: (state, action: PayloadAction<IChartData[]>) => {
      state.PurchaseChart = action.payload;
    },
    SetReturnChart: (state, action: PayloadAction<IChartData[]>) => {
      state.ReturnChart = action.payload;
    },

    // Individual Total Setters
    SetExpenseTotal: (state, action: PayloadAction<number>) => {
      state.ExpenseTotal = action.payload;
    },
    SetSaleTotal: (state, action: PayloadAction<number>) => {
      state.SaleTotal = action.payload;
    },
    SetPurchaseTotal: (state, action: PayloadAction<number>) => {
      state.PurchaseTotal = action.payload;
    },
    SetReturnTotal: (state, action: PayloadAction<number>) => {
      state.ReturnTotal = action.payload;
    },

    // Combined Setters (Chart + Total from backend response)
    SetExpenseData: (state, action: PayloadAction<IDashboardResponse>) => {
      state.ExpenseChart = action.payload.last30Days;
      state.ExpenseTotal = action.payload.Total[0]?.totalAmount || 0;
    },
    SetSaleData: (state, action: PayloadAction<IDashboardResponse>) => {
      state.SaleChart = action.payload.last30Days;
      state.SaleTotal = action.payload.Total[0]?.totalAmount || 0;
    },
    SetPurchaseData: (state, action: PayloadAction<IDashboardResponse>) => {
      state.PurchaseChart = action.payload.last30Days;
      state.PurchaseTotal = action.payload.Total[0]?.totalAmount || 0;
    },
    SetReturnData: (state, action: PayloadAction<IDashboardResponse>) => {
      state.ReturnChart = action.payload.last30Days;
      state.ReturnTotal = action.payload.Total[0]?.totalAmount || 0;
    },

    // Reset Dashboard
    ResetDashboard: state => {
      state.ExpenseChart = [];
      state.PurchaseChart = [];
      state.ReturnChart = [];
      state.SaleChart = [];
      state.ExpenseTotal = 0;
      state.SaleTotal = 0;
      state.PurchaseTotal = 0;
      state.ReturnTotal = 0;
    },
  },
});

export const {
  SetExpenseChart,
  SetSaleChart,
  SetPurchaseChart,
  SetReturnChart,
  SetExpenseTotal,
  SetSaleTotal,
  SetPurchaseTotal,
  SetReturnTotal,
  SetExpenseData,
  SetSaleData,
  SetPurchaseData,
  SetReturnData,
  ResetDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
