import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage";
import LogInPage from './pages/LogInPage';
import EmailVerifyPage from './pages/EmailVerifyPage';
import VerifyPage from './pages/VerifyPage';
import DashBordPage from './pages/admin/DashBordPage';
import { CatagoryPage } from './pages/admin/CatagoryPage';

const App = () => {
  return (
    <>
       <Routes>
        <Route path="/" element={ <><Link to={'/register'}>register</Link> <Link to={"/login"}>login</Link> </>} />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/login" element={ <LogInPage /> } />
        <Route path="/emailVerify" element={ <EmailVerifyPage /> } />
        <Route path="/verify/:id" element={ <VerifyPage /> } />

        <Route path="/admin/DU/user" element={ <DashBordPage /> } />
        <Route path="/admin/DU/catagory" element={ <CatagoryPage /> } />
        {/* <Route path="/admin/DU" element={ <DashBordPage /> } /> */}
      </Routes>
    </>
  )
}

export default App