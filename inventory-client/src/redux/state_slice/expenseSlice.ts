import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface InputChangePayload {
  name: keyof IExpense;
  value: string | number;
}

export interface IExpense {
  _id?: string;
  typeID?: string;
  amount: number;
  note: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ExpenseState {
  List: IExpense[] | null;
  ListTotal: number;
  FormValue: IExpense;
  ExpenseTypeDropDown: any[] | null;
}

const initialState: ExpenseState = {
  List: [],
  ListTotal: 0,
  ExpenseTypeDropDown: [],
  FormValue: {
    typeID: '',
    amount: 0,
    note: '',
  },
};

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    SetExpenseList: (state, action: PayloadAction<IExpense[]>) => {
      state.List = action.payload;
    },
    SetExpenseListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
    SetExpenseTypeDropDown: (state, action) => {
      state.ExpenseTypeDropDown = action.payload;
    },
    OnChangeExpenseInput: (
      state,
      action: PayloadAction<InputChangePayload>,
    ) => {
      const { name, value } = action.payload;
      (state.FormValue as any)[name] = value;
    },
    ResetFormValue: state => {
      state.FormValue = {
        typeID: '',
        amount: 0,
        note: '',
      };
    },
  },
});

export const {
  SetExpenseList,
  SetExpenseListTotal,
  OnChangeExpenseInput,
  ResetFormValue,
  SetExpenseTypeDropDown,
} = expenseSlice.actions;

export default expenseSlice.reducer;
