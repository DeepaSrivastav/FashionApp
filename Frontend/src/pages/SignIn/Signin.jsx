import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function Signin(){
  const [message, setMessage] = useState("")
  const {loginUser, signInWithGoogle} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState:{errors}
  }=useForm()

  const onSubmit = async (data) => {
    console.log(data)

    try {
      await loginUser(data.email, data.password);
      alert("Login successful!");
      navigate("/")
    } catch (error) {
      setMessage("Please provide a valid email and password")
      console.error(error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful!")
      navigate("/")
    } catch (error) {
      alert("Google sign in failed")
      console.error(error)
    }
  }
    return(
        <>
          <Helmet>
            <title>Sign In - Access Your Account Now</title>
            <meta 
               name="description"
               content="Sign in to your account to explore personalized features. Don't have an account?
               Sign up today and stay updated with our latest terms and privacy policies
               "
            />
          </Helmet>
          <div className="w-full h-full bg-gray-200">
            <div className="flex md:flex-row">
              <div className="w-full h-full">
                <div className="flex flex-row justify-between self-stretch bg-white">
                   <div className="w-[50%] mb-[336px] pl-[20px] pr-[20px] flex flex-col gap-[50px]">
                    <a href="/">
                      <img
                        src="src/assets/fashion-logo.webp"
                        alt="Fashion Image"
                        className="h-[84px] w-[20%] object-contain"
                      />
                      </a>
                      <div className="flex flex-col items-center gap-[22px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="flex flex-col items-center gap-6 self-stretch">
                            <div className="flex flex-col items-start justify-center gap-7 self-stretch">
                               <h1 className="text-[26px] font-semibold md:text-[24px] sm:text-[22px]">
                                  Sign in to your account
                               </h1>
                               <div className="flex flex-col gap-8 self-stretch">
                                 <div className="flex flex-col items-start justify-center gap-1.5">
                                    <p className="text-[18px] font-medium">
                                       Email Address
                                    </p>
                                    <input
                                    {...register("email",{required:true})}
                                      type="email"
                                      name="email"
                                      id="email"
                                      placeholder="Email ID"
                                      className="self-stretch rounded-md border border-solid border-blue-gray px-[18px]"
                                    />
                                 </div>
                                 <div className="flex flex-col items-start justify-center gap-1.5">
                                    <p className="text-[18px] font-medium">
                                       Password
                                    </p>
                                    <input
                                    {...register("password",{required:true})}
                                      type="password"
                                      name="password"
                                      id="password"
                                      placeholder="Password"
                                      className="self-stretch rounded-md border border-solid border-blue-gray px-[18px]"
                                    />
                                 </div>
                                 {
                                  message && <p className="text-red-500 text-xs italic mb-3">{message}</p>
                                 }
                                 <a href="#">
                                    <h2 className="text-[16px] font-semibold">
                                       Forgot Password?
                                    </h2>
                                 </a>
                               </div>
                            </div>
                            
                              <button
                                className="self-stretch text-white py-2 bg-blue-gray rounded-md px-[34px] sm:px-5"
                              >
                                SIGN IN
                              </button>
                          
                         </div>
                         </form>
                         <div className="flex flex-wrap gap-1">
                           <a href="#">
                             <p className="text-[16px] font-normal">
                               Don't have an account?
                             </p>
                           </a>
                           <a href="/signup">
                            <h3 className="text-[16px] font-bold">
                               Sign Up
                            </h3>

                           </a>
                         </div>
                      </div>
                      <div className="mt-4">
                        <button
                         onClick={handleGoogleSignIn}
                         className="w-full flex flex-wrap gap-1 items-center justify-center bg-blue-gray hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                         <FaGoogle className="mr-2"/>
                           Sign in with Google

                        </button>
                      </div>
                      <div className="h-px w-full self-stretch bg-gray-200">
                        <div className="flex flex-wrap gap-[22px]">
                          <a href='#'>
                            <p className="text-[16px] font-normal text-gray-200">
                              Terms & Conditions
                            </p>
                          </a>
                          <a href='#' className="self-end">
                            <p className="text-[16px] font-normal text-gray-200">
                              Privacy Policy
                            </p>
                          </a>
                        </div>
                      </div>
                   </div>
                   <img
                    src="src/assets/signinimage.jpg"
                    alt="Featured Image"
                    className="h-[1024] w-full object-cover"
                  />
                </div>
                  
              </div>
            </div>
          </div>
        </>
    )
}