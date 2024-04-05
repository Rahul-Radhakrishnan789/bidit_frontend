import React from "react";
import { Grid, Box } from "@mui/material";


export default function LandingFeatures() {
  return (
    <Grid
      container
      spacing={10}
      display={"flex"}
      flexDirection={"column"}
      paddingX={"8%"}
      paddingY={"5%"}
      position={"relative"}
    >
      <Grid item>
    
          <Box sx={sx.mainBoxStyle}>
            <Box style={sx.imageBox}>
              {" "}
             <img width={300} src="/beach_wedding_small.jpg" alt="" />
            </Box>
            <Box style={sx.textBox}>
            
            The platform offers a curated selection of pre-loved wedding items, allowing couples to discover one-of-a-kind treasures for their special day. From vintage wedding dresses and elegant tableware to whimsical decorations and handcrafted centerpieces, the variety caters to diverse tastes and budgets.
            </Box>
          </Box>
       
      </Grid>
      <Grid item>
      
          <Box sx={sx.centerBox}>
            <Box style={sx.textBox}>
              
            Participate in exciting auctions and bid competitively on coveted items. The platform provides a transparent bidding system, allowing you to track your bids and set alerts to stay informed.
            </Box>
            <Box style={sx.imageBox}>
             <img width={300} src="/ring_picture.jpg" alt="" />
            </Box>
          </Box>
       
      </Grid>
      <Grid item>
       
          <Box sx={sx.mainBoxStyle}>
            <Box style={sx.imageBox}>
             <img  width={300} src="/questions.jpg" alt="" />
            </Box>
            <Box style={sx.textBox}>
           
            Interact directly with sellers through a built-in messaging system. Ask questions about the item, negotiate shipping details, and ensure a smooth buying experience. Find inspiration for your wedding theme, decor ideas, and budgeting tips from a vibrant online.
            </Box>
          </Box>
       
      </Grid>
    
    </Grid>
  );
}

const sx = {
  centerBox: {
    height: "auto",
    borderRadius: "80px",
    display: "flex",
    alignItems: "center",
    padding: "15px",
   
    paddingX: "5%",
    paddingBottom: { xs: "10%", sm: "10%", md: "10%", lg: "15px" },
    flexDirection: {
      xs: "column-reverse",
      sm: "column-reverse",
      md: "column-reverse ",
      lg: "row",
    },
  },
  mainBoxStyle: {
    height: "auto",
    borderRadius: "80px",

    display: "flex",
    alignItems: "center",
    padding: "15px",
    paddingX: "5%",
    paddingBottom: { xs: "10%", sm: "10%", md: "10%", lg: "15px" },
    flexDirection: { xs: "column", sm: "column", md: "column ", lg: "row" },
  },
  imageBox: {
    width: "290px",
    height: "220px",
    background: "#ff000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

  },
  textBox: {
    marginLeft: "10%",
    marginRight: "5%",
    maxWidth: "500px",
    letterSpacing: ".5px",
    wordSpacing: "1.5%",
    // textAlign: 'center',
  },
};