import axios from 'axios'

const getAllItems = async(email) => {
    // const config = {
    //     headers: {
    //         Authorization:`Bearer ${token}`
    //     }
    // }
    const config = {
        headers: {
            
            'Content-Type': 'application/json',
        },
        credentials:true
    }

    const response = await axios.get(`http://127.0.0.1:3000/api/cart/${email}`, config)

    return response.data
}

const addItem = async(data) => {
    const config = {
        headers: {
            
            'Content-Type': 'application/json',
        },
        credentials:true
    }
   try{
    const response = await axios.post('http://127.0.0.1:3000/api/cart/', data,config)
    console.log(response.data)
   return response.data
   } catch(error){
    if(!error.response){
        console.error("Network error",error)
    }
    console.error("Error response",error.response)
   }
   
}

const deleteItem = async(id, token) => {
    const config = {
        headers:{
            // Authorization:`Bearer ${token}`
            'Content-type':'application/json',
        },
        credentials:true
    }

    const response = await axios.delete(`http://localhost:3000/api/cart/${id}`, config)

    return response.data
}

const deleteAll = async() => {
    const config = {
        headers:{
            'Content-Type': 'application/json',

        },
        credentials:true
    }

    const response = await axios.delete('http://127.0.0.1:3000/api/cart', config)

    return response.data
}


// addToCart:(state, action) => {
//     const existingItem = state.cartItems.find(item => item._id === action.payload._id);
//     if(!existingItem){
//         state.cartItems.push(action.payload)
//         Swal.fire({
//             position:'top-end',
//             icon:'success',
//             title:'Product Added to Cart',
//             showConfirmButton:false,
//             timer: 1500
//         });
//     } else(
//         Swal.fire({
//             title:'Item already added to Cart',
//             text:"You won't be able to revert this!",
//             icon:'warning',
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "OK!"
//         })
//     )
// },
// removeFromCart: (state, action) => {
//     state.cartItems = state.cartItems.filter(item => item._id !== action.ayload_id)
// },
// clearCart:(state) => {
//     state.cartItems=[]
// }

const cartService = {
    getAllItems,
    addItem,
    deleteItem,
    deleteAll
}

export default cartService