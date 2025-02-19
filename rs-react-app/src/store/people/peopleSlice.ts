import { createSlice } from '@reduxjs/toolkit';
import { IPeople } from '../../types/resultAPI.interface';
import { peopleApi } from './peopleApi';

interface IMarkedPeople extends IPeople {
  isChecked: boolean;
}
interface IInitialState {
  peoples: IPeople[];
  markedPeoples: IMarkedPeople[];
  isOpenDetails: boolean;
  isLoading: boolean;
}
const initialState: IInitialState = {
  peoples: [],
  markedPeoples: [],
  isOpenDetails: false,
  isLoading: true,
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    toggleMarkedPeoples: (state, { payload }: { payload: IPeople }) => {
      const index = state.markedPeoples.findIndex(
        (item) => item.id === payload.id
      );
      if (index !== -1) {
        state.markedPeoples.splice(index, 1);
      } else {
        state.markedPeoples.push({ ...payload, isChecked: true });
      }
    },
    removeItems: (state) => {
      state.markedPeoples = [];
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      peopleApi.endpoints.getListPeoples.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      peopleApi.endpoints.getListPeoples.matchFulfilled,
      (state, { payload }) => {
        state.peoples = payload.results;
        state.isLoading = false;
      }
    );
  },
});

export const { toggleMarkedPeoples, removeItems } = peopleSlice.actions;
export default peopleSlice.reducer;
