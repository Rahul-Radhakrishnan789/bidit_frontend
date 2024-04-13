import React, { useEffect, useState } from "react";
import { Box, styled, Grid, Card, Typography, Button } from "@mui/material";
import Navbar from "../../components/userComponents/Navbar";
import Footer from "../../components/userComponents/Footer";
import axios from "../../utils/AxiosInstance"

// -------styles--------------

const Maincontainer = styled(Box)`
    /* background: red; */
`;
const Subcontainer = styled(Box)`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;
const ItemCard = styled(Card)`
    padding: 0.7rem;
`;
const GridContainer = styled(Grid)``;
const GridItems = styled(Grid)``;

const ImageAndDesc = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`;

const Image = styled(Box)`
    height: 250px;
    width: 100%;
    /* background: yellow; */
    img {
        height: 100%;
        width: 100%;
    }
`;

const BidContent = styled(Box)`
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title_price {
    }

    button {
        background: black;
    }
    button:hover {
        background: #000000b9;
    }
`;
// ---------styles---------



const UserBids = () => {

    const [datas,setDatas] = useState([])


    // payment --------------   

    const initPayment = (data) => {
        const options = {
          amount: datas.amount,
          currency: data.currency,
          description: "Test Transaction",
          image:
            "https://img.freepik.com/premium-vector/fast-play-symbol-logo-with-letter-f_45189-7.jpg?w=740",
          order_id: data.id,
          handler: async (response) => {
            try {
              const additionalCredentials = {
                amount: datas[0]?.highestBidderId.amount
               
              };
              const user = localStorage.getItem("userId");
    
              console.log("uid", user);
    
              const { data } = await axios.post(`/api/paymentfinal/${datas[0]?.itemId}/${user}`, {
                ...response,
                ...additionalCredentials,
              });
              console.log(data);
              if (data) {
                // handleOrders();
              }
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };

      const handleClick = async () => {
        try {
          const { data } = await axios.post("/api/paymentstart", {
            amount: datas[0]?.highestBidderId.amount
          });
          console.log(data);
          initPayment(data.data);
        } catch (error) {
          console.error("error:", error);
        }
      };
    
    
// fetch data ------------

const fetchData = async () => {


    const userId = localStorage.getItem("userId")

    const response = await axios.get("/api/fetchuserbids")

    const usersBids = response.data.data.filter((data) => data.highestBidderId.userId == userId)

    setDatas(usersBids)

    console.log('responseData',usersBids)

}

useEffect(() => {
    fetchData()
},[])
    return (
        <Maincontainer sx={{ padding: { xs: "0 .5rem", sm: "0 1rem" } }}>
            <Box sx={{ position: "sticky", top: "0", background: "white", zIndex: "1" }}>
                <Navbar />
            </Box>
            <Subcontainer sx={{ padding: { xs: "1rem .5rem", sm: "1rem 3rem" } }}>
                <ItemCard>
                    <GridContainer container spacing={2}>
                        <GridItems item xs={12} md={6}>
                            <ImageAndDesc sx={{ bgcolor: "" }}>
                                <Image>
                                    <img
                                        src="https://img.freepik.com/free-photo/decorated-hall-wedding-is-ready-celebration_8353-10236.jpg"
                                        alt=""
                                    />
                                </Image>
                                <Typography sx={{ padding: { xs: "0 .5rem", sm: "0 2rem" } }}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae natus amet sit culpa id
                                    assumenda provident ab, aliquid consectetur maiores.
                                </Typography>
                            </ImageAndDesc>
                        </GridItems>
                        <GridItems item xs={12} md={6}>
                            <BidContent sx={{ padding: { xs: "1rem", sm: "2rem" } }}>
                                <Box className="title_price">
                                    <Typography variant="h3">Title</Typography>
                                    <Typography variant="h5">Bid Price: $ 100000</Typography>
                                </Box>

                                <Button variant="contained" onClick={handleClick}>Pay Now</Button>
                            </BidContent>
                        </GridItems>
                    </GridContainer>
                </ItemCard>
            </Subcontainer>
            <Footer />
        </Maincontainer>
    );
};

export default UserBids;
