import React from "react";
import { Box, styled, Grid, Card ,} from "@mui/material";
import Navbar from '../../components/userComponents/Navbar'
import Footer from '../../components/userComponents/Footer'

// -------styles--------------

const Maincontainer = styled(Box)`
    /* background: red; */
    padding: 0 1rem;
`;
const Subcontainer = styled(Box)`
padding: 1rem 3rem;
min-height: 100vh;

`;
const GridContainer = styled(Grid)``;
const GridItems = styled(Grid)``;
const ItemCard = styled(Card)`
    width: 100%;
`;

// ---------styles---------

const UserBids = () => {
    return (
        <Maincontainer>
            <Navbar/>
            <Subcontainer>
                <ItemCard>
                    <GridContainer container spacing={2}>
                        <GridItems item>
                            <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, alias?</Box>
                        </GridItems>
                        <GridItems item>
                            <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, alias?</Box>
                        </GridItems>
                    </GridContainer>
                </ItemCard>
            </Subcontainer>
            <Footer/>
        </Maincontainer>
    );
};

export default UserBids;
