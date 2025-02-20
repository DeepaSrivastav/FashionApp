import { Helmet } from "react-helmet";
import { useForm } from 'react-hook-form'
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Signup(){
 
const [message, setMessage] = useState();
const [isChecked, setIsChecked] = useState(false)
const {registerUser, signInWithGoogle} = useAuth();
const { register, handleSubmit, watch, reset} = useForm()
const navigate = useNavigate()

const onSubmit = async (data) => {
  console.log(data)
  try {
     await registerUser(data.email, data.password);
     alert("User registered successfully")
     reset()
  } catch (error) {
      setMessage("Please provide a valid email and password")
      console.log(error)
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
                         <div className="flex flex-col items-center gap-6 self-stretch">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col items-start justify-center gap-7 self-stretch">
                               <h1 className="text-[26px] font-semibold md:text-[24px] sm:text-[22px]">
                                  Sign up to create your account
                               </h1>
                               
                               <div className="flex flex-col gap-8 self-stretch">
                                <div className="flex flex-col items-start justify-center gap-1.5">
                                <p className="text-[18px] font-medium">
                                  Name
                                </p>
                                <input
                                  {...register('name',{required:true})}
                                  type='text'
                                  name="name"
                                  id="name"
                                  placeholder="Name"
                                  className="self-stretch rounded-md border border-solid border-blue-gray px-[18px]"
                                />
                                </div>
                                
                                 <div className="flex flex-col items-start justify-center gap-1.5">
                                    <p className="text-[18px] font-medium">
                                       Email Address
                                    </p>
                                    <input
                                    {...register('email',{required:true})}
                                      type="email"
                                      name="email"
                                      id="email"
                                      placeholder="Email ID"
                                      className="self-stretch rounded-md border border-solid border-blue-gray px-[18px]"
                                    />
                                 </div>
                                 <div className="flex flex-col items-start justify-center self-stretch gap-1.5">
                                    <p className="text-[18px] font-medium">
                                       Password
                                    </p>
                                       <input
                                       {...register('password',{required:true})}
                                        type='password'
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className="flex h-[58px] items-center justify-center self-stretch rounded-md border border-solid border-blue-gray bg-white px-1"                                       />
                                     
                                    
                                    
                                 </div>
                                 <div className="flex flex-col items-start justify-center self-stretch gap-1.5">
                                    <p className="text-[18px] font-medium">
                                       Confirm Password
                                    </p>
                                       <input
                                       {...register('confirm_password',{required:true, validate:(val)=>{if(watch('password')!=val){
                                        return "Your passwords do not match"
                                       }}})}
                                        type='password'
                                        name="confirm_password"
                                        id="confirm_password"
                                        placeholder="Confirm Password"
                                        className="flex h-[58px] items-center justify-center self-stretch rounded-md border border-solid border-blue-gray bg-white px-1"/>                                    
                                 </div>
                                 {
                                  message && <p className="text-red-500 text-xs italic mb-3">{message}</p>
                                 }
                                 <span>
                                 <input
                                   type="checkbox"
                                   label="By signing up I agree to the Terms & Conditions and Privacy Policy"
                                   id="TermsCheckbox"
                                   className=" mr-[5px] rounded gap-2 text-blue-gray sm:pr-5"
                                   onChange={(e)=>setIsChecked(e.target.checked)}
                                 />
                                 <label className="text-[16px] font-chivo">
                                 By signing up I agree to the Terms & Conditions and Privacy Policy
                                 </label>
                                 </span>
                                 
                                
                               </div>
                               
                            </div>
                            
                              <button
                                className={`${!isChecked ? "bg-gray-500" : "bg-blue-gray"} self-stretch w-full mt-5 text-white py-2 rounded-md px-[34px] sm:px-5`}
                                disabled={!isChecked}
                              >
                                SIGN UP
                              </button>
                          </form>
                         </div>

                        <div className="mt-4">
                             <button
                                onClick={handleGoogleSignIn}
                                className="w-full flex flex-wrap gap-1 items-center justify-center bg-blue-gray hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                                
                                <FaGoogle className="mr-2"/>
                                Sign in with Google
                                
                                
                            
                                </button>
                        </div>
                         <div className="flex flex-wrap gap-1">
                           <a href="#">
                             <p className="text-[16px] font-normal">
                               Already have an account?
                             </p>
                           </a>
                           <a href="/signin">
                            <h3 className="text-[16px] font-bold">
                               Sign In
                            </h3>

                           </a>
                         </div>
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
                    src="src/assets/signupimage-1.png"
                    alt="Featured Image"
                    className="w-full object-cover"
                  />
                </div>
                  
              </div>
            </div>
          </div>
        </>
    )
}