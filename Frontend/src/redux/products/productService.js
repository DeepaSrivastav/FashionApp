import axios from 'axios'

const API_URL = '/api/products/'

const getAllProducts = async() => {
    
        const config = {
            headers: {
                
                'Content-Type': 'application/json',
            },
            credentials:true
        }
    
    

    const response = await axios.get('http://127.0.0.1:3000/api/products', config)
     console.log(response.data)
    return response.data
}

const addAProduct = async(data, token) => {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.post('http://127.0.0.1:3000/api/admin/add', data , config)
    return response.data
}


const deleteAProduct = async (id, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`http://127.0.0.1:3000/api/admin/delete/${id}`, config)

     return response.data
}

const update = async (id, data,token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`http://127.0.0.1:3000/api/admin/edit/${id}`, data, config)

     console.log(response.data,"updated product response")
     return response.data
}

const getById = async (id, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`http://127.0.0.1:3000/api/products/${id}`, config)
  console.log(response)
     return response.data
}
const productService = {
    getAllProducts,
    addAProduct,
    deleteAProduct,
    update,
    getById
}

export default productService