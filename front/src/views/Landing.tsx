import Navbar from "./../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./../components/Home";
import Login from "@/components/Login";
import Register from "@/components/Register";

function Landing() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default Landing;
