import Navbar from "./../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./../components/Home";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Fields from "@/components/Fields";
import PricingPage from "@/components/Pricing";

function Landing() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/fields" element={<Fields />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </div>
  );
}

export default Landing;
