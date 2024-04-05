import React from "react";
import Navbar from "../../components/userComponents/Navbar";
import { Box } from "@mui/material";
import UserImageSection from "../../components/userComponents/UserImageSection";

export default function UserHomePage() {
  return (
    <>
      <Navbar />
      <Box>
      <UserImageSection/>
      </Box>
    </>
  );
}
