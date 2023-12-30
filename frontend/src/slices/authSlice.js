Stored user information in localStorage for persistent loginimport { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const initialState = { userInfo: userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        }
    }
})

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
