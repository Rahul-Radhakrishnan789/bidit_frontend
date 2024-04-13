import React from "react";
import Navbar from "../../components/userComponents/Navbar";
import Footer from "../../components/userComponents/Footer";
import OfflineAuctions from "../../components/userComponents/OfflineAuctions";
import Details from "../../components/userComponents/Details";
import UserImageSection from "../../components/userComponents/UserImageSection";
import { Box } from "@mui/material";

export default function UserHomePage() {
    return (
        <>
            <Box sx={{ position: "sticky", top: "0", background: "white", zIndex: "1" }}>
                <Navbar />
            </Box>

            <UserImageSection />

            <Details />

            <OfflineAuctions />

            <Footer />
        </>
    );
}
