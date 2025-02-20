import React, { useEffect, useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { addProduct } from '../../../redux/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [imageFileName, setimageFileName] = useState('')
    const [imageLoadingState, setImageLoadingState] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState("")
    const dispatch = useDispatch()

    const { isLoading, isError} = useSelector((state)=>state.product)
    
    const onSubmit = async (data) => {
 
        const newProductData = {
            name:data.name,
            category:data.category,
            coverImage: `${uploadedImageUrl}`,
            price:data.price,
        }
        try {
            dispatch(addProduct(newProductData))
            Swal.fire({
                title: "Product added",
                text: "Your product is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Okay!"
              });
              reset();
              setimageFileName('')
              setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add product. Please try again.")   
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
      console.log(response.data.result.url)
        setUploadedImageUrl(response.data.result.url);
        console.log(uploadedImageUrl,"url")
        setImageLoadingState(false)
      
    }

    useEffect(() => {
      if( imageFile !== null) uploadImageToCloudinary();
    },[imageFile]);


  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Name"
          name="name"
          placeholder="Enter Product Name"
          register={register}
        />

        {/* Reusable Textarea for Description */}
      

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
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

     

        {/* New Price */}
        <InputField
          label="Price"
          name="price"
          type="number"
          placeholder="Price"
          register={register}
          
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Add Product</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddProduct