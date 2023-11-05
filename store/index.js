import taskReducer from './taskReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({reducer:{tasks:taskReducer}});
