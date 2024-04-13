import React from "react";
import { Box, styled, Grid, Card, Typography, Button } from "@mui/material";
import Navbar from "../../components/userComponents/Navbar";
import Footer from "../../components/userComponents/Footer";

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

                                <Button variant="contained">Place order</Button>
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
