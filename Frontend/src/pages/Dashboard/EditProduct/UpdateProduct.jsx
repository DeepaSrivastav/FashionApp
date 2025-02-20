import React, { useEffect, useState } from 'react'
import InputField from '../AddProduct/InputField'
import SelectField from '../AddProduct/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, updateProduct } from '../../../redux/products/productSlice';
import axios from 'axios'

const UpdateProduct = () => {

  const dispatch = useDispatch();

  

    const [imageFile, setimageFile] = useState(null);
      const [imageFileName, setimageFileName] = useState('')
      const [imageLoadingState, setImageLoadingState] = useState(false)
      const [uploadedImageUrl, setUploadedImageUrl] = useState("")

  const { id } = useParams();
  // console.log(bookData)
  const { register, handleSubmit, setValue, reset } = useForm();


  const onSubmit = async (data) => {
    const updateProductData = {
      name: data.name,
      category: data.category,
      price: Number(data.price),
      coverImage: `${uploadedImageUrl}`
    };
    console.log(updateProductData,"Product for updating")
    try {
       dispatch(updateProduct(id, updateProductData))
      Swal.fire({
        title: "Product Updated",
        text: "Your product is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay!"
      });
    } catch (error) {
      console.error(error)
      console.log("Failed to update product.");
      alert("Failed to update product.");
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if(file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  }

  async function uploadImageToCloudinary () {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my-file", imageFile);
    const response = await axios.post("http://127.0.0.1:3000/api/admin/upload-image", data);

    console.log(response, "response");

      setUploadedImageUrl(response?.data?.result.url);
      console.log(uploadedImageUrl)
      setImageLoadingState(false)
    
  }

  useEffect(() => {
    dispatch(getProductById(id))

    if( imageFile !== null) uploadImageToCloudinary();
  },[imageFile]);

  let product = useSelector((state)=> state.product?.products)
  console.log(product)


  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Product</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
      
        <InputField
          label="Name"
          name="name" 
          id="name"       
          placeholder="Name"
          register={register}
        />

 <SelectField
          label="Category"
          name="category"
          id="category"
          options={[
            { value: " ", label: "Choose a category" },
            { value: "Womens Footwear", label: "Women's Footwear" },
            { value: "Men's footwear", label: "Men's Footwear" },
            { value: "Women's casual", label: "Women's Casual" },
            { value: "Men's casual", label: "Men's Casual" },
            { value: "Men's formal", label: "Men's Formal" },
            { value: "Women's formal", label: "Women's Formal" },
       
            // Add more options as needed
          ]}
          register={register}
        />
      

        <InputField
          label="Price"
          name="price"
          id="price"
          placeholder="Price"
          type="number"
          register={register}
        />

<div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>



        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Product
        </button>
      </form>
    </div>
  )
}

export default UpdateProduct