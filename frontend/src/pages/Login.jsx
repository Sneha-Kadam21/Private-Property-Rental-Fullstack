import React, { useState, useContext } from 'react'
import { FaEye } from "react-icons/fa"
import { FaEyeLowVision } from "react-icons/fa6"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'

function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { serverUrl, loading, setLoading } = useContext(authDataContext)
  const { setUserData } = useContext(userDataContext)

  const handleLogin = async (e) => {
    e.preventDefault() // ✅ MUST BE FIRST
    setLoading(true)

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
          timeout: 5000 // ✅ prevents infinite loading
        }
      )

      console.log("LOGIN SUCCESS:", result.data)

      setUserData(result.data)
      setLoading(false)
      navigate("/")

    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message)
      setLoading(false) // ✅ ensures loading stops

      // Optional: user-friendly alert
      alert(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>

      {/* Back Button */}
      <div
        className='w-[50px] h-[50px] bg-red-500 cursor-pointer absolute top-[10%] left-[10px] rounded-full flex items-center justify-center'
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className='w-[25px] h-[25px] text-white' />
      </div>

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className='max-w-[900px] w-[90%] h-[600px] flex flex-col items-center md:items-start gap-[10px]'
      >
        <h1 className='text-[30px] text-black'>Welcome to WanderStay</h1>

        {/* Email */}
        <div className='w-[90%] flex flex-col gap-[10px] mt-[20px]'>
          <label htmlFor="email" className='text-[20px]'>Email</label>
          <input
            type="email"
            id="email"
            className='w-[90%] h-[40px] text-[18px] px-[20px] border-[2px] border-[#555656] rounded-lg'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className='w-[90%] relative flex flex-col gap-[10px]'>
          <label htmlFor="password" className='text-[20px]'>Password</label>
          <input
            type={show ? "text" : "password"}
            id="password"
            className='w-[90%] h-[40px] text-[18px] px-[20px] border-[2px] border-[#555656] rounded-lg'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!show ? (
            <FaEye
              className="w-[22px] h-[22px] cursor-pointer absolute right-[12%] bottom-[10px]"
              onClick={() => setShow(true)}
            />
          ) : (
            <FaEyeLowVision
              className="w-[22px] h-[22px] cursor-pointer absolute right-[12%] bottom-[10px]"
              onClick={() => setShow(false)}
            />
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className='px-[50px] py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-lg mt-[20px]'
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Redirect */}
        <p className='text-[18px]'>
          Create new account{" "}
          <span
            className='text-[19px] text-red-500 cursor-pointer'
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>

      </form>
    </div>
  )
}

export default Login