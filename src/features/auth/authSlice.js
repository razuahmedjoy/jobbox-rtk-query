import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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

    return data.user.email;

})

export const loginUser = createAsyncThunk("auth/login",async ({email,password},thunkAPI)=>{
    
    const data = await signInWithEmailAndPassword(auth,email,password);

    return data.user.email;

})

export const googleLogin = createAsyncThunk("auth/googleLogin",async ()=>{
    
    const googleProvider = new GoogleAuthProvider();
    const data = signInWithPopup(auth,googleProvider);

    return data.user.email;

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
        },
        setUser : (state,action)=>{
            console.log(action);
            state.email = action.payload;
            state.isLoading = false;

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
            state.email = action.payload.email;
            state.isError = false;
            state.error = "";
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        //google login user
        builder.addCase(googleLogin.pending,(state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(googleLogin.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.email = action.payload.email;
            state.isError = false;
            state.error = "";
        })
        builder.addCase(googleLogin.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
    

});


export const {logoutUser,setUser} = authSlice.actions;
export default authSlice.reducer;