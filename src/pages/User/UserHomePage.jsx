import React from "react";
import Navbar from "../../components/userComponents/Navbar";
import Footer from "../../components/userComponents/Footer";
import OfflineAuctions from "../../components/userComponents/OfflineAuctions";
import Details from "../../components/userComponents/Details"

export default function UserHomePage() {
  return (
    <>
      <Navbar />

      <Details/>

      <OfflineAuctions/>
     
     <Footer/>
    </>
  );
}
