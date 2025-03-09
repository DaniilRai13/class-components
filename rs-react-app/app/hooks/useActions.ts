import { handleError, resetError } from '@/store/errorSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  removeItems,
  toggleMarkedPeoples,
} from '../store/people/peopleSlice';

const rootActions = {
  toggleMarkedPeoples,
  removeItems,
  handleError,
  resetError,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};
