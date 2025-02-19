import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorMessage: '',
  isError: false,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    handleError: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload || 'Something went wrong';
    },
    resetError: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
  },
});

export const { handleError, resetError } = errorSlice.actions;
export default errorSlice.reducer;
