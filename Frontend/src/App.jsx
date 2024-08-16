import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage";
import LogInPage from './pages/LogInPage';
import EmailVerifyPage from './pages/EmailVerifyPage';
import VerifyPage from './pages/VerifyPage';

const App = () => {
  return (
    <>
       <Routes>
        <Route path="/" element={ <><Link to={'/register'}>register</Link> <Link to={"/login"}>login</Link> </>} />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/login" element={ <LogInPage /> } />
        <Route path="/emailVerify" element={ <EmailVerifyPage /> } />
        <Route path="/verify/:id" element={ <VerifyPage /> } />
      </Routes>
    </>
  )
}

export default App