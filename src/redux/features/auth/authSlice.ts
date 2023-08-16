import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: {
    email: string | null;
  };
  accessToken: string | null;
}

const initialState: AuthState = {
  user: {
    email: null,
  },
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    userLoggedOut: (state) => {
      state.user.email = null;
      state.accessToken = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
