import React from "react";
import { Box, Button, Typography, } from "@mui/material";

export default function OfflineAuctions() {
  return (
    <>
      <Box sx={sx.mainBox}>
        <Box sx={{ textAlign: "center",paddingTop:'1 %' }}>
          <Typography variant="h6">
            We are available offline in major Cities{" "}
          </Typography>
          <br />
          <Button sx={sx.button}>Find Offline Auctions</Button>
        </Box>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',padding:'5%',overflow:'hidden'}}>
          <img
            width={400}
           
            src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </Box>
      </Box>
    </>
  );
}

const sx = {
  mainBox: {
    maxHeight: "70vh",
    display: {sm:'column',md:"flex",lg:'flex'},
    justifyContent: "space-around",
    alignItems: "center",
    margin: "5%",
    background: "#F2F2F2",
    paddingX:'5%'
  },
  button: {
    background: "red",
    color: "#fff",
    textTransform:"none"
  },
};
