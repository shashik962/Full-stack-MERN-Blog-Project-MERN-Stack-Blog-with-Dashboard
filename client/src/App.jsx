import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./pages/About.jsx"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route element={<PrivateRoute />} >
              <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
          <Route path="/projects" element={<Projects />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}