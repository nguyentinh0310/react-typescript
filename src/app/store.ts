import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import cityReducer from 'features/DashBoard/city/citySlice';
import studentReducer from 'features/DashBoard/student/studentSlice';
import cartRuducer from  'features/Cart/cartSlice'

export const store = configureStore({
  reducer: {
    student: studentReducer,
    city: cityReducer,
    cart: cartRuducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
