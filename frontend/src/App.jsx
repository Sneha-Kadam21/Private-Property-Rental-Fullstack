import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import { useContext } from 'react'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { userDataContext } from './context/UserContext'



function App() {
  const { userData } = useContext(userDataContext)
  return (
  <>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/listingpage1" element={userData !=null ?<ListingPage1/>:<Navigate to= {"/login"}/>}></Route>
        <Route path="/listingpage2" element={userData !=null ?<ListingPage2/>:<Navigate to= {"/login"}/>}></Route>
         <Route path="/listingpage3" element={userData !=null ?<ListingPage3/>:<Navigate to= {"/login"}/>}></Route>
  </Routes>
  </>
  )
}

export default App