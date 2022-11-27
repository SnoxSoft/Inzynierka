import {configureStore} from '@reduxjs/toolkit';
import postsReducer from "./reducer";


const store = configureStore({reducer: {userData: postsReducer}})

export default store;