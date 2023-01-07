import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const initialState = {
    user: { email: "", role: "" },
    isLoading: true,
    isError: false,
    error: "",
}


export const getUser = createAsyncThunk("auth/getUser", async (email, thunkAPI) => {

    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/${email}`);
    const data = await res.json();

    if(data.status){
        return data;
    }
    return email;


})
export const createUser = createAsyncThunk("auth/createUser", async ({ email, password }, thunkAPI) => {

    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data.user.email;

})

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }, thunkAPI) => {

    const data = await signInWithEmailAndPassword(auth, email, password);

    return data.user.email;

})

export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {

    const googleProvider = new GoogleAuthProvider();
    const data = signInWithPopup(auth, googleProvider);

    return data.user.email;

})
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state, action) => {
            state.user = {email:"",role:""};
            state.isLoading = false;
            state.isError = false;
            state.error = "";
        },
        setUser: (state, action) => {
            console.log(action);
            state.user.email = action.payload;
            state.isLoading = false;

        },
        toggleLoading: (state, action) => {
            state.isLoading = false
        },
    },

    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user.email = action.payload;
            state.isError = false;
            state.error = "";
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        //login user
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user.email = action.payload;
            state.isError = false;
            state.error = "";
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        //google login user
        builder.addCase(googleLogin.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(googleLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user.email = action.payload;
            state.isError = false;
            state.error = "";
        })
        builder.addCase(googleLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        
        //get user
        builder.addCase(getUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            if(action.payload.status){
                state.user = action.payload.data;
                
            }else{
                state.user.email = action.payload;
            }
            state.isError = false;
            state.error = "";
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }


});


export const { logoutUser, setUser, toggleLoading } = authSlice.actions;
export default authSlice.reducer;