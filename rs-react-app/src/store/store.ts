import { configureStore } from '@reduxjs/toolkit';
import { peopleApi } from './people/peopleApi';
import peopleReducer from './people/peopleSlice';
export const store = configureStore({
  reducer: {
    people: peopleReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
