import React from "react";
import Navbar from "../../components/userComponents/Navbar";
import Footer from "../../components/userComponents/Footer";
import OfflineAuctions from "../../components/userComponents/OfflineAuctions";
import Details from "../../components/userComponents/Details"
import UserImageSection from "../../components/userComponents/UserImageSection";

export default function UserHomePage() {
  return (
    <>
      <Navbar />
      <Box>
      <UserImageSection/>
      </Box>

      <Details/>

      <OfflineAuctions/>
     
     <Footer/>
    </>
  );
}
