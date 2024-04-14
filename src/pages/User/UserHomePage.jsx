import React from "react";
import Navbar from "../../components/userComponents/Navbar";
import Footer from "../../components/userComponents/Footer";
import OfflineAuctions from "../../components/userComponents/OfflineAuctions";
import Details from "../../components/userComponents/Details";
import UserImageSection from "../../components/userComponents/UserImageSection";
import { Box, styled } from "@mui/material";

const Maincontainer = styled(Box)`
    background-image: url("https://t3.ftcdn.net/jpg/00/98/52/26/360_F_98522695_S9vAeY8a3O4AYFUDr2WVlk4eCWrqf7hx.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export default function UserHomePage() {
    return (
        <Maincontainer>
            <Box sx={{ position: "sticky", top: "0", background: "white", zIndex: "1" }}>
                <Navbar />
            </Box>
            <UserImageSection />
            <Details />
            <OfflineAuctions />
            <Footer />
        </Maincontainer>
    );
}
