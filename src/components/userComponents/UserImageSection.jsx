import { Box, Grid, Typography, styled } from "@mui/material";
import React from "react";

const Maincontainer = styled(Box)`
    margin-top: 20px;
    padding: 20px 30px;
`;
const Grids = styled(Grid)``;

const GridItmes = styled(Grid)`
    padding: 0;
`;

const TexContent = styled(Box)`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
`;
const Text = styled(Typography)`
    max-width: 80%;
    width: 100%;
`;

const ImageContent = styled(Box)`
    height: 100%;
    img {
        height: 100%;
        width: 100%;
        border-radius: 20px;
    }
`;

const UserImageSection = () => {
    return (
        <Maincontainer>
            <Grids container spacing={2}>
                <GridItmes item xs={12} md={6}>
                    <TexContent sx={{height:{xs:'auto', md:'100%'},textAlign:{xs:'center', md:'left'}}}>
                        <Text variant="h3">Unveiling Dream Weddings</Text>
                        <Text >
                        Turn "I do" into "I won!"  BIDIT is your one-stop shop for creating a wedding that's uniquely you, without breaking the bank.  Experience the thrill of an online auction platform dedicated to securing your dream wedding services and products at incredible prices.
                        </Text>
                    </TexContent>
                </GridItmes>
                <GridItmes item xs={12} md={6}>
                    <ImageContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ height: "200px" }}>
                                    <img
                                        src="https://media.istockphoto.com/id/471906412/photo/beautiful-table-setting-for-an-wedding-reception-or-an-event.webp?b=1&s=170667a&w=0&k=20&c=o-cOg8tKKH10TxUg9EAlHbSfjRPoMdgVFzpRpQqTaVI="
                                        alt=""
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ height: "200px" }}>
                                    <img
                                        src="https://badhaihoevents.in/wp-content/uploads/2021/01/wedding-lawns-in-dwarka-delhi-to-host-the-most-special-day-of-your-life.jpg"
                                        alt=""
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Box sx={{ height: "200px" }}>
                                    <img
                                        src="https://sigaram.co.in/decorations/wp-content/uploads/sites/7/2014/08/Sakthi-Wedding-004-1024x512.jpg"
                                        alt=""
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </ImageContent>
                </GridItmes>
            </Grids>
        </Maincontainer>
    );
};

export default UserImageSection;
