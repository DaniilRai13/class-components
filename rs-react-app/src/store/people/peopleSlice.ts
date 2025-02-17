import { createSlice } from '@reduxjs/toolkit';
import { IPeople } from '../../types/resultAPI.interface';
interface IInitialState {
  markedPeoples: IPeople[];
  isOpenDetails: boolean;
}
const initialState: IInitialState = {
  markedPeoples: [],
  isOpenDetails: false,
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    toggleMarkedPeoples: (state, { payload: id }) => {
      state.markedPeoples.forEach((people) => {
        if (people.id === id) {
          state.markedPeoples.filter((item) => item.id !== id);
        }
      });
    },
  },
});

export const { toggleMarkedPeoples } = peopleSlice.actions;
export default peopleSlice.reducer;
