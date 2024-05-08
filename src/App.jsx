import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUpPage from "./pages/User/SignUpPage";
import LoginPage from "./pages/User/LoginPage";
import UserHomePage from "./pages/User/UserHomePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import UserAuctions from "./pages/User/UserAuctions";
import VendorHomePage from "./pages/vendor/VendorHomePage";
import UserBidView from "./pages/User/UserBidView ";
import UserBids from "./pages/User/UserBids";
import AdminLoginPage from "./pages/Admin/AdminLogin";
import ViewBidStatus from "./pages/vendor/ViewBidStatus"
function App() {
    return (
        <GoogleOAuthProvider clientId="203571099479-rksr2l7odk6d8m71nrk8n2g1jv5aerpo.apps.googleusercontent.com">
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<UserHomePage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/vendor" element={<VendorHomePage />} />
                        <Route path="/user/auctions" element={<UserAuctions />} />
                        <Route path="/user/auctions/bid/:id" element={<UserBidView />} />
                        <Route path="/adminlogin" element={<AdminLoginPage/>} />
                        <Route path="/admin" element={<AdminHomePage />} />
                        <Route path="/user/mybids" element={<UserBids />} />
                        <Route path="/vendor/bidview/:id" element={<ViewBidStatus/>} />
                    </Routes>
                </Router>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
