// import {createSlice}from '@reduxjs/toolkit';

// const uiSlice = createSlice({
//     name: 'ui',
//     initialState: { cartIsVisible: false },
//     reducers: {
//         toggle(state) {
//             state.cartIsVisible = !state.cartIsVisible;
//         }
//     }
// });

// export const uiActions = uiSlice.actions;
// export default uiSlice; 
import { createSlice } from '@reduxjs/toolkit';
const configSlice = createSlice({
    name: "config",
    initialState: {
        config: []
    },
    reducers: {
        updateConfigs(state, action) {
            console.log(action);
            state.config = action.payload[0]
        }
    }
});
export const configActions = configSlice.actions;
export default configSlice;