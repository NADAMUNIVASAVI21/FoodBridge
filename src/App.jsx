import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Splash from "./pages/Splash";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminUsers from "./pages/admin/AdminUsers";

import DonorDashboard from "./pages/donor/DonorDashboard";
import DonorProfile from "./pages/donor/DonorProfile";
import AddFood from "./pages/donor/AddFood";
import MyFood from "./pages/donor/MyFood";

import NgoDashboard from "./pages/ngo/NgoDashboard";
import NgoProfile from "./pages/ngo/NgoProfile";
import AvailableFood from "./pages/ngo/AvailableFood";
import BookedFood from "./pages/ngo/BookedFood";

export default function App() {
  const [showSplash, setShowSplash] = useState(false);

  return (
    <BrowserRouter>
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setShowSplash={setShowSplash} />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* Donor */}
        <Route path="/donor" element={<DonorDashboard />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
        <Route path="/donor/add" element={<AddFood />} />
        <Route path="/donor/myfood" element={<MyFood />} />

        {/* NGO */}
        <Route path="/ngo" element={<NgoDashboard />} />
        <Route path="/ngo/profile" element={<NgoProfile />} />
        <Route path="/ngo/available" element={<AvailableFood />} />
        <Route path="/ngo/booked" element={<BookedFood />} />
      </Routes>
    </BrowserRouter>
  );
}
