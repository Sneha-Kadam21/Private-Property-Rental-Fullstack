import React, { useContext } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from 'react-icons/gi';
import { MdBedroomParent } from 'react-icons/md';
import { MdOutlinePool } from 'react-icons/md';
import { GiWoodCabin } from 'react-icons/gi';
import {SiHomeassistantcommunitystore} from 'react-icons/si';
import {IoBedOutline} from 'react-icons/io5';
import {FaTreeCity} from 'react-icons/fa6';
import {BiBuildingHouse} from 'react-icons/bi';
import { listingDataContext } from '../context/ListingContext';

function ListingPage2() {
    let navigate=useNavigate()
    let {category,setCategory}=useContext(listingDataContext)
  return (
    <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto relative'>

    <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute 
         top-[5%] left-[10px] rounded-[50%] flex items-center justify-center ' 
         onClick={()=>navigate("/listingpage1")}><FaArrowLeft 
         className='w-[25px] h-[25px] text-[white]'/></div>


          <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px]
           absolute top-[5%] right-[10px] shadow-lg'>
            SetUp Your  Category
          </div>

     <div className='max-w-[900px] w-[100%] h-[550px] overflow-auto bg-white flex items-center justify-start flex-col gap-[40px] mt-[30px] ' >
          <h1 className='text-[18px] text-[black] md:text-[30px] mt-[10px] px-[10px]'>Which of these best decribes your place?</h1>

          <div className='max-w-[900px] w-[100%] overflow-auto mt-[50px] h-[100%] flex
           flex-wrap items-center justify-center 
           md:items-start gap-[15px] md:w-[70%] '>

        <div className={`w-[180px] h-[100px] flex justify-center items-center 
        flex-col cursor-pointer border-[2px] hiver:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Villa"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("Villa")}>
            <GiFamilyHouse className='w-[30px] h-[30px] text-[black]'/><h3>Villa</h3>
         </div>

        <div className={`w-[180px] h-[100px] flex justify-center items-center 
        flex-col cursor-pointer border-[2px] hiver:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Farm House"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("Farm House")}>
        <MdBedroomParent className='w-[30px] h-[30px] text-[black]'/><h3>Farm House</h3>
         </div>

        <div className={`w-[180px] h-[100px] flex justify-center items-center 
        flex-col cursor-pointer border-[2px] hiver:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Pool House"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("Pool House")}>
        <MdOutlinePool className='w-[30px] h-[30px] text-[black]'/><h3>Pool House</h3>
         </div>

         <div className={`w-[180px] h-[100px] flex justify-center items-center 
        flex-col cursor-pointer border-[2px] hiver:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Rooms"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("Rooms")}>
        <GiWoodCabin className='w-[30px] h-[30px] text-[black]'/><h3>Rooms</h3>
         </div>

        <div className={`w-[180px] h-[100px] flex justify-center items-center 
        flex-col cursor-pointer border-[2px] hiver:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Flat"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("Flat")}>
        <SiHomeassistantcommunitystore className='w-[30px] h-[30px] text-[black]'/><h3>Flat</h3>
         </div>
         <div className={`w-[180px] h-[100px] flex justify-center items-center 
        flex-col cursor-pointer border-[2px] hiver:border-[#a6a5a5] text-[16px] rounded-lg ${category=="PG"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("PG")}>
        <IoBedOutline className='w-[30px] h-[30px] text-[black]'/><h3>PG</h3>
         </div>
     
        <div className={`w-[180px] h-[100px] flex justify-center items-center 
        flex-col cursor-pointer border-[2px] hiver:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Cabin"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("Cabin")}>
        <FaTreeCity className='w-[30px] h-[30px] text-[black]'/><h3>Cabin</h3>
         </div>

         <div className={`w-[180px] h-[100px] flex justify-center items-center 
        flex-col cursor-pointer border-[2px] hiver:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Shops"?"border-4 border-[#8b8b8b]":""}`} onClick={()=>setCategory("Shops")}>
        <BiBuildingHouse className='w-[30px] h-[30px] text-[black]'/><h3>Shops</h3>
         </div>













          </div>
          
          </div>
           <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg absolute right-[5%] bottom-[5%]' disabled={!category}  onClick={()=>navigate("/listingpage3")}>Next</button>

    </div>
  )
}

export default ListingPage2