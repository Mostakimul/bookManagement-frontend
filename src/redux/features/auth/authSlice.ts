import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: {
    email: string | null;
  };
}

const initialState: AuthState = {
  user: {
    email: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user.email = action.payload.email;
    },
    userLoggedOut: (state) => {
      state.user.email = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
