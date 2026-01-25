import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../state_slice/settingsSlice';
import profileReducer from '../state_slice/profileSlice';
import brandReducer from '../state_slice/brandSlice';
import categoryReducer from '../state_slice/categorySlice';
import customerReducer from '../state_slice/customerSlice';
import dashboardReducer from '../state_slice/dashboardSlice';
import expenseReducer from '../state_slice/expenseSlice';
import expenseTypeReducer from '../state_slice//expenseTypeslice';
import productReducer from '../state_slice/productSlice';
import purchaseReducer from '../state_slice/purchaseSlice';
import reportReducer from '../state_slice/reportslice';
import returnReducer from '../state_slice/returnslice';
import saleReducer from '../state_slice/saleSlice';
import supplierReducer from '../state_slice/supplierSlice';
import summaryReducer from '../state_slice/summarySlice'
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    profile: profileReducer,
    brand: brandReducer,
    category: categoryReducer,
    customer: customerReducer,
    dashboard: dashboardReducer,
    expense: expenseReducer,
    expensetype: expenseTypeReducer,
    product: productReducer,
    purchase: purchaseReducer,
    report: reportReducer,
    return: returnReducer,
    sale: saleReducer,
    supplier: supplierReducer,
    summary: summaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
