import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { authDataContext } from './AuthContext'

export const listingDataContext = createContext()

function ListingContext({ children }) {

  let navigate = useNavigate()

  let [title, setTitle] = useState("")
  let [description, setDescription] = useState("")
  let [frontEndImage1, setFronteEndImage1] = useState(null)
  let [frontEndImage2, setFronteEndImage2] = useState(null)
  let [frontEndImage3, setFronteEndImage3] = useState(null)

  let [backEndImage1, setBackEndImage1] = useState(null)
  let [backEndImage2, setBackEndImage2] = useState(null)
  let [backEndImage3, setBackEndImage3] = useState(null)

  let [rent, setRent] = useState("")
  let [city, setCity] = useState("")
  let [landmark, setlandmark] = useState("")
  let [category, setCategory] = useState("")
  let [adding, setAdding] = useState(false)
  let [listingData, setListingData] = useState([])

  let { serverUrl } = useContext(authDataContext)

  // ================= ADD LISTING =================
  const handleAddListing = async () => {
    console.log("BUTTON CLICKED")

    // 🔥 DEBUG IMAGES
    console.log("IMAGES:", backEndImage1, backEndImage2, backEndImage3)

    setAdding(true)

    try {
      let formData = new FormData()

      formData.append("title", title)
      formData.append("description", description)
      formData.append("image1", backEndImage1)
      formData.append("image2", backEndImage2)
      formData.append("image3", backEndImage3)
      formData.append("rent", rent)
      formData.append("city", city)
      formData.append("landmark", landmark) // ✅ FIXED
      formData.append("category", category)

      let result = await axios.post(
        serverUrl + "/api/listing/add",
        formData,
        { withCredentials: true }
      )

      console.log("SUCCESS:", result.data)

      // ✅ REAL-TIME UPDATE (VERY IMPORTANT)
      setListingData(prev => [result.data, ...prev])

      setAdding(false)
      navigate("/")

      // reset
      setTitle("")
      setDescription("")
      setFronteEndImage1(null)
      setFronteEndImage2(null)
      setFronteEndImage3(null)
      setBackEndImage1(null)
      setBackEndImage2(null)
      setBackEndImage3(null)
      setRent("")
      setCity("")
      setlandmark("")
      setCategory("")

    } catch (error) {
      console.log("ADD ERROR:", error.response?.data || error.message)
      setAdding(false)
    }
  }

  // ================= GET LISTINGS =================
  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get")
      setListingData(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getListing()
  }, [])

  let value = {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFronteEndImage1,
    frontEndImage2, setFronteEndImage2,
    frontEndImage3, setFronteEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setlandmark,
    category, setCategory,
    handleAddListing,
    adding, setAdding,
    listingData, setListingData,
  }

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  )
}

export default ListingContext