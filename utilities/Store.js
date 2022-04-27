import { configureStore } from "@reduxjs/toolkit";
import showNavReducer from "../Reducers/showNav";
import showSignInModelReducer from '../Reducers/showSignInModel';

export default configureStore({
  reducer: {
    navbar: showNavReducer,
    signInModel:showSignInModelReducer,
  },
});
