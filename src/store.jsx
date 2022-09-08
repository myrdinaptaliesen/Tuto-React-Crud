import {configureStore} from '@reduxjs/toolkit';
import {loginButtonSlice} from "./component/loginButtonSlice";
import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    loggedIn: loginButtonSlice.reducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})