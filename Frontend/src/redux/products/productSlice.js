import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}

export const getProducts = createAsyncThunk('products/getAll', async(_, thunkAPI) => {
    try{
        // const token = thunkAPI.getState().auth.user.token
        // console.log(token)
       return  await productService.getAllProducts()
       
       
    } catch(error){
          return thunkAPI.rejectWithValue(error)
    }
})

export const addProduct = createAsyncThunk('products/add', async(productData, thunkAPI) => {

    try {
        const token = localStorage.getItem('token')
       return await productService.addAProduct(productData, token)
    } catch (error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteProduct = createAsyncThunk('products/delete', async(id,thunkAPI) => {

    try {
        const token = localStorage.getItem('token')
        return await productService.deleteAProduct(id, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateProduct = createAsyncThunk('products/update', async(id, data,thunkAPI) => {

    try {
        const token = localStorage.getItem('token')
        return await productService.update(id, data, token)
    } catch (error) {
        console.log(error)
    }
})

export const getProductById = createAsyncThunk('products/get', async(id, thunkAPI) => {
    try {
       const token = localStorage.getItem('token')
       return await productService.getById(id, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})



export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(builder) => {
        builder
            .addCase(getProducts.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProducts.rejected,(state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(addProduct.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(addProduct.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(addProduct.rejected,(state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteProduct.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                )
            })
            .addCase(deleteProduct.rejected,(state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateProduct.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
                
            })
            .addCase(updateProduct.rejected,(state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getProductById.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getProductById.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload

                
            })
            .addCase(getProductById.rejected,(state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer