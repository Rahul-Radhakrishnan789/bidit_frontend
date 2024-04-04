import React from "react";
import Navbar from "../../components/userComponents/Navbar";
import { Box } from "@mui/material";

export default function UserHomePage() {
  return (
    <>
      <Navbar />
      <Box sx={{ height: "80vh", backgroundImage: 'url("https://d3ry1h4w5036x1.cloudfront.net/hero-v2.svg")', backgroundSize: 'cover',backgroundPosition:'30%', '@media (max-width: 600px)': {
          height: '50vh'}}}>
        <Box >iiiiiiiiiiiiiiihi</Box>
      </Box>
    </>
  );
}
