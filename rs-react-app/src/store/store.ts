import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { peopleApi } from './people/peopleApi';
import peopleReducer from './people/peopleSlice';
import errorReducer from './errorSlice';
export const rootReducer = combineReducers(
  {
    errorReducer: errorReducer,
    people: peopleReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  }
)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
