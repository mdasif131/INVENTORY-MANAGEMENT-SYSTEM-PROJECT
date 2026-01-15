import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TypeState {
  List: any[] | null;
  ListTotal: number;
}

const initialState: TypeState = {
  List: [],
  ListTotal: 0,
};

export const brandSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    SetReportList: (state, action: PayloadAction<any[]>) => {
      state.List = action.payload;
    },
    SetReportListTotal: (state, action: PayloadAction<number>) => {
      state.ListTotal = action.payload;
    },
  },
});

export const { SetReportList, SetReportListTotal } = brandSlice.actions;
export default brandSlice.reducer;
