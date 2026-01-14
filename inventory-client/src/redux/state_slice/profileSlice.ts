import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface IProfile {
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  photo?: string;
  password?: string;
  createDate?: string;
}

interface ProfileState {
  value: IProfile | null;
}

const initialState: ProfileState = {
  value: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    SetProfile: (state, action: PayloadAction<IProfile>) => {
      state.value = action.payload;
    },
  },
});

export const { SetProfile } = profileSlice.actions;
export default profileSlice.reducer;
