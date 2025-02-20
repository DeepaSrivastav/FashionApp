import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Swal from 'sweetalert2'
import cartService from "./cartService"


const initialState = {
    cartItems:[],
    isError: false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const getCart = createAsyncThunk('cart/getAll', async(email, thunkAPI) => {
    try{
        return await cartService.getAllItems(email);
    } catch(error){
        thunkAPI.rejectWithValue(error)
    }
})

export const addToCart = createAsyncThunk(
    'cart/add',
    async(data,thunkAPI) => {
        try{
            return await cartService.addItem(data)
        } catch(error){
          console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteCartItem = createAsyncThunk('cart/deleteItem', async(ItemId, thunkAPI)=>{
    try{
      // const token = thunkAPI.getState().auth.user.token
        return await cartService.deleteItem(ItemId)
    } catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const clearCart = createAsyncThunk('cart/deleteAll', async(thunkAPI)=>{
    try{
        return await cartService.deleteAll()
    } catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})


const cartSlice = createSlice({
    name:'cart',
    initialState: initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers: (builder) => {
        builder
          .addCase(addToCart.pending, (state) => {
            state.isLoading = true
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isSuccess = true,
            state.cartItems.push(action.payload),
            Swal.fire({
                position:'top-end',
                icon:'success',
                title:'Product Added to Cart',
                showConfirmButton:false,
                timer: 1500
            })
           
        
          })
          .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload
            Swal.fire({
                title:'Item already added to Cart',
                text:"You won't be able to revert this!",
                icon:'warning',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK!"
            })
          })
          .addCase(getCart.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.cartItems = action.payload
            console.log(state.cartItems)
          })
          .addCase(getCart.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload
          })
          .addCase(deleteCartItem.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.cartItems = state.cartItems.filter(
                (item) => item._id != action.payload.id    //server returns the id of the deleted goal which is there in action.payload.id
            )
          })
          .addCase(deleteCartItem.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(clearCart.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(clearCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.cartItems = []
          })
          .addCase(clearCart.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
    }
})

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;