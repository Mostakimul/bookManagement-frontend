import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: {
    email: string | null;
  };
  token: string | null;
}

const initialState: AuthState = {
  user: {
    email: null,
  },
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
