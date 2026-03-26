import React, { useContext, useState } from 'react'
import axios from 'axios'
import logo from "../../assets/airbnb-logo.png"

import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

// Icons
import { FaSearch } from "react-icons/fa"
import { GiHamburgerMenu, GiFamilyHouse, GiWoodCabin } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import { MdWhatshot, MdBedroomParent, MdOutlinePool } from "react-icons/md"
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import { IoBedOutline } from 'react-icons/io5'
import { FaTreeCity } from 'react-icons/fa6'
import { BiBuildingHouse } from 'react-icons/bi'

function Navbar() {

  let [showPopUp, setShowPopUp] = useState(false)
  let navigate = useNavigate()

  let { serverUrl } = useContext(authDataContext)
  let { userData, setUserData } = useContext(userDataContext)

  const handleLogout = async () => {
    try {
      let result = await axios.post(serverUrl + '/api/auth/logout', {}, { withCredentials: true })
      setUserData(null)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='fixed top-0 w-full bg-white z-50'>

      {/* TOP NAVBAR */}
      <div className='w-full min-h-[80px] border-b px-[20px] flex items-center justify-between md:px-[40px]'>

        {/* Logo */}
        <img src={logo} alt="logo" className='w-[100px]' />

        {/* Search */}
        <div className='w-[35%] relative hidden md:block'>
          <input
            type="text"
            placeholder='Any location | Anywhere | Any City'
            className='w-full px-[30px] py-[10px] border-2 border-gray-300 rounded-full outline-none'
          />
          <button className='absolute right-[3%] top-[5px] bg-red-500 p-[10px] rounded-full'>
            <FaSearch className='text-white' />
          </button>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-[10px] relative'>

          <span
            className='hidden md:block text-[18px] cursor-pointer px-[8px] py-[5px] hover:bg-gray-100 rounded-full'
            onClick={() => navigate("/listingpage1")}
          >
            List your Home
          </span>

          <button
            onClick={() => setShowPopUp(prev => !prev)}
            className='px-[20px] py-[10px] flex items-center gap-[5px] border rounded-full hover:shadow-lg'
          >
            <GiHamburgerMenu />
            {!userData && <CgProfile />}
            {userData && (
              <span className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center'>
                {userData?.name?.slice(0, 1)}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showPopUp && (
            <div className='w-[220px] absolute bg-white top-[110%] right-[5%] border rounded-lg shadow-md'>
              <ul className='flex flex-col text-[16px]'>

                {!userData && (
                  <li
                    className='px-[15px] py-[10px] hover:bg-gray-100 cursor-pointer'
                    onClick={() => { navigate('/login'); setShowPopUp(false) }}
                  >
                    Login
                  </li>
                )}

                {userData && (
                  <li
                    className='px-[15px] py-[10px] hover:bg-gray-100 cursor-pointer'
                    onClick={() => { handleLogout(); setShowPopUp(false) }}
                  >
                    Logout
                  </li>
                )}

                <hr />

                <li
                  className='px-[15px] py-[10px] hover:bg-gray-100 cursor-pointer'
                  onClick={() => { navigate("/listingpage1"); setShowPopUp(false) }}
                >
                  List Your Home
                </li>

                <li className='px-[15px] py-[10px] hover:bg-gray-100 cursor-pointer'>
                  My Listing
                </li>

                <li className='px-[15px] py-[10px] hover:bg-gray-100 cursor-pointer'>
                  Check Bookings
                </li>

              </ul>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className='w-full h-[60px] flex items-center justify-center md:hidden'>
        <div className='w-[80%] relative'>
          <input
            type="text"
            placeholder='Any location | Anywhere | Any City'
            className='w-full px-[30px] py-[10px] border-2 border-gray-300 rounded-full outline-none'
          />
          <button className='absolute right-[3%] top-[5px] bg-red-500 p-[10px] rounded-full'>
            <FaSearch className='text-white' />
          </button>
        </div>
      </div>

      {/* CATEGORY NAVBAR (FIXED ICONS) */}
      <div className='w-full h-[85px] flex items-center gap-[40px] overflow-x-auto px-[15px] md:justify-center no-scrollbar'>

        <div className='flex flex-col items-center text-[13px]'>
          <MdWhatshot className='w-[28px] h-[28px]' />
          <h3>Trending</h3>
        </div>

        <div className='flex flex-col items-center text-[13px]'>
          <GiFamilyHouse className='w-[28px] h-[28px]' />
          <h3>Villa</h3>
        </div>

        <div className='flex flex-col items-center text-[13px]'>
          <GiWoodCabin className='w-[28px] h-[28px]' />
          <h3>Cabins</h3>
        </div>

        <div className='flex flex-col items-center text-[13px]'>
          <MdBedroomParent className='w-[28px] h-[28px]' />
          <h3>Rooms</h3>
        </div>

        <div className='flex flex-col items-center text-[13px]'>
          <MdOutlinePool className='w-[28px] h-[28px]' />
          <h3>Pool</h3>
        </div>

        <div className='flex flex-col items-center text-[13px]'>
          <SiHomeassistantcommunitystore className='w-[28px] h-[28px]' />
          <h3>Community</h3>
        </div>

        <div className='flex flex-col items-center text-[13px]'>
          <IoBedOutline className='w-[28px] h-[28px]' />
          <h3>Stay</h3>
        </div>

        <div className='flex flex-col items-center text-[13px]'>
          <FaTreeCity className='w-[28px] h-[28px]' />
          <h3>City</h3>
        </div>

        <div className='flex flex-col items-center text-[13px]'>
          <BiBuildingHouse className='w-[28px] h-[28px]' />
          <h3>Apartments</h3>
        </div>

      </div>
    </div>
  )
}

export default Navbar