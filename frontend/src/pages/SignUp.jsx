import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import { authDataContext } from '../context/AuthContext';
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import axios from 'axios'

function SignUp() {
    let [show,setShow]=useState(false);
    let navigate=useNavigate()
    let {serverUrl}=useContext(authDataContext)
    let [name,setName]=useState("")
     let [email,setEmail]=useState("")
      let [password,setPassword]=useState("")
      let {userData,setUserData}=useContext(userDataContext) 
      let {loading,setLoading}=useContext(authDataContext)


    const handleSignup=async (e)=>{
      setLoading(true)

      try{

        e.preventDefault()
let result= await axios.post(serverUrl+"/api/auth/signup",{
name,
email,
password
},{withCredentials:true})
setLoading(false)
setUserData(result.data)
navigate("/")
console.log(result)
      }catch(error){
       console.log(error)
      }
    }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
       <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[10px] rounded-[50%] flex items-center justify-center ' onClick={()=>navigate("/")}><FaArrowLeft className='w-[25px] h-[25px] text-[white]'/></div>
       <form action="" onSubmit={handleSignup} className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center  flex-col md:items-start gap-[10px] '>
        <h1 className='text-[30px] text-[black]'>Welcome to WanderStay</h1>
        <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
              <label htmlFor="name" className='text-[20px]'>UserName</label>
              <input type="text" id="name" className='w-[90%] h-[40px] text-[18px] px-[20px] border-[2px] border-[#555656] rounded-lg' required onChange={(e)=>setName(e.target.value)}/>
        </div>
           <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
              <label htmlFor="email" className='text-[20px]'>Email</label>
              <input type="text" id="email" className='w-[90%] h-[40px] text-[18px] px-[20px] border-[2px] border-[#555656] rounded-lg' required onChange={(e)=>setEmail(e.target.value)}/>
        </div>
           <div className='w-[90%] relative flex items-start justify-start flex-col gap-[10px] '>
              <label htmlFor="password" className='text-[20px]'>Password</label>
              <input type={show?"text":"password"}  id="password" className='w-[90%] text-[18px] px-[20px] h-[40px] border-[2px] border-[#555656] rounded-lg ' required onChange={(e)=>setPassword(e.target.value)}/>
          {!show && (
  <FaEye 
    className="w-[22px] cursor-pointer h-[22px] absolute right-[12%] bottom-[10px]" 
    onClick={() => setShow(prev => !prev)} 
  />
)}

{show && (
  <FaEyeLowVision 
    className="w-[22px] cursor-pointer  h-[22px] absolute right-[12%] bottom-[10px]" 
    onClick={() => setShow(prev => !prev)} 
  />
)}
        </div>

        <button className='px-[50px] mt-[20px]  py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg'disabled={loading}>{loading?"Loading...":"SignUp"}</button>
          <p className='text-[18px]'>Already have an account?<span className='text-[19px] text-[red] cursor-pointer' onClick={()=>navigate("/login")}>Login</span></p>
       </form>

    </div>
  )
}

export default SignUp