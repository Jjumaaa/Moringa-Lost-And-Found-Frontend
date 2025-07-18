import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemReducer from './itemSlice';
import activityReducer from './activitySlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
    activities: activityReducer,
  },
});