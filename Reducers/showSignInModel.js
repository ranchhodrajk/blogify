import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModel: false,
  isDeleteModel:false,
  deletePostId : '',
};

export const showSignInModelSlice = createSlice({
  name: "signInModel",
  initialState,
  reducers: {
    showSignInModel: (state, action) => {
      state.isShowModel = action.payload;
      console.log("isShow Reducer", state.isShowModel);
    },
    showDeleteModel: (state, action) => {
      state.isDeleteModel = action.payload;
      console.log("isShow Reducer", state.isDeleteModel);
    },
    setDeletePostId: (state, action) => {
      state.deletePostId = action.payload;
      console.log("Delte post id", state.deletePostId);
    },
  },
});

export const { showSignInModel,showDeleteModel,setDeletePostId } = showSignInModelSlice.actions;
export default showSignInModelSlice.reducer
