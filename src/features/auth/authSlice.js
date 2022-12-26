import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const initialState ={
    email: "",
    role:"",
    isLoading:true,
    isError:false,
    error:"",
}


export const createUser = createAsyncThunk("auth/createUser",async ({email,password},thunkAPI)=>{
    
    const data = await createUserWithEmailAndPassword(auth,email,password);

    return data;

})

export const loginUser = createAsyncThunk("auth/login",async ({email,password},thunkAPI)=>{
    
    const data = await signInWithEmailAndPassword(auth,email,password);

    return data;

})
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logoutUser:(state,action)=>{
            state.email = "";
            state.role = "";
            state.isLoading = false;
            state.isError = false;
            state.error = "";
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(createUser.pending,(state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(createUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.email = action.payload.user.email;
            state.isError = false;
            state.error = "";
        })
        builder.addCase(createUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        //login user
        builder.addCase(loginUser.pending,(state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.email = action.payload.user.email;
            state.isError = false;
            state.error = "";
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
    

});


export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;