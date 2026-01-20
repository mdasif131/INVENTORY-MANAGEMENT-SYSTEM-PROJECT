import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export interface IExpenseType {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}
interface InputChangePayload {
  name: keyof IExpenseType;
  value: string ;
}
interface TypeState {
  List: any[] | null;
  ListTotal: number;
  FormValue: IExpenseType;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
  FormValue: {
    name: ""
  }
};

export const brandSlice = createSlice({
  name: 'expensetype',
  initialState,
  reducers: {
    SetExpenseTypeList: (state, action: PayloadAction<any[]>) => {
      state.List = action.payload;
    },
    SetExpenseTypeListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
    OnChangeExpenseTypeInput: (
      state,
      action: PayloadAction<InputChangePayload>,
    ) => {
      const { name, value } = action.payload;
      (state.FormValue as any)[name] = value;
    },
    ResetExpenseTypeFormValue: state => {
      state.FormValue = {
        name: ""
      };
    },
  },
});

export const {
  SetExpenseTypeList,
  SetExpenseTypeListTotal,
  OnChangeExpenseTypeInput,
  ResetExpenseTypeFormValue,
} = brandSlice.actions;
export default brandSlice.reducer;
