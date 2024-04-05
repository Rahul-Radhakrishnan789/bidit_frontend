import { useState, useEffect } from "react";

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import {
    Box,
    styled,
    Checkbox,
    Tooltip,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
} from "@mui/material";

import FoundationIcon from "@mui/icons-material/Foundation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TimelapseIcon from "@mui/icons-material/Timelapse";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import Navbar from "../../components/userComponents/Navbar";

const SideBars = styled(Sidebar)`
    .ps-sidebar-container {
        background: #ecebeb;
    }
`;

const AuctionContent = styled(Box)`
    background-color: #dddbdb;
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding: 10px 20px;
`;
const GridContainer = styled(Grid)``;
const GridItems = styled(Grid)``;

const Cards = styled(Card)`
    height: 280px;
    width: 100%;
`;
const ImageBox = styled(Box)`
    height: 60%;
    width: 100%;

    img {
        height: 100%;
        width: 100%;
    }
`;
const CardContents = styled(CardContent)`
    height: fit-content;
    padding-bottom: 30px;
`;

const Lists = styled(List)`
    padding: 0;
    #listSeats {
        width: 200px;
    }
    #listPlace {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
`;
const ListItems = styled(ListItem)`
    margin-bottom: 1px;
    padding: 0;
    .listIcon {
        min-width: 30px;
    }
    #facilities {
        display: -webkit-box !important;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: pre-line;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 250px, dis;
    }
`;

const UserAuctions = () => {
    const { collapseSidebar } = useProSidebar();
    return (
        <>
            <Navbar />
            <div style={{ height: "100vh", display: "flex" }}>
                <SideBars style={{ height: "100vh !important" }}>
                    <Menu>
                        <MenuItem
                            icon={<MenuOutlinedIcon />}
                            onClick={() => {
                                collapseSidebar();
                            }}
                            style={{ textAlign: "center" }}
                        >
                            {" "}
                            <h3>Filters</h3>
                        </MenuItem>

                        <Tooltip title="item" placement="right" arrow>
                            <MenuItem>
                                <span>
                                    <Checkbox />
                                </span>
                                <span>items</span>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip title="item" placement="right" arrow>
                            <MenuItem>
                                <span>
                                    <Checkbox />
                                </span>
                                <span>items</span>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip title="item" placement="right" arrow>
                            <MenuItem>
                                <span>
                                    <Checkbox />
                                </span>
                                <span>items</span>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip title="item" placement="right" arrow>
                            <MenuItem>
                                <span>
                                    <Checkbox />
                                </span>
                                <span>items</span>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip title="item" placement="right" arrow>
                            <MenuItem>
                                <span>
                                    <Checkbox />
                                </span>
                                <span>items</span>
                            </MenuItem>
                        </Tooltip>
                    </Menu>
                </SideBars>
                <AuctionContent>
                    <GridContainer container spacing={2}>
                        <GridItems item xs={12} sm={6} lg={3}>
                            <Cards>
                                <ImageBox>
                                    <img src={"venue.images[0].url"} alt="Venue Image" />
                                </ImageBox>
                                <CardContents>
                                    <Lists>
                                        <ListItems>
                                            <ListItemIcon className="listIcon">
                                                <TurnedInIcon style={{height:'18px'}} />
                                            </ListItemIcon>
                                            <ListItemText secondary={"venue.title"} />
                                        </ListItems>

                                        <ListItems>
                                            <ListItemIcon className="listIcon">
                                                <CurrencyRupeeIcon style={{height:'18px'}} />
                                            </ListItemIcon>
                                            <ListItemText secondary={"venue.price"} />
                                        </ListItems>
                                            <ListItems id="listPlace">
                                                <ListItemIcon className="listIcon">
                                                    <TimelapseIcon style={{height:'18px'}} />
                                                </ListItemIcon>
                                                <ListItemText secondary={"venue.place"} />
                                            <Button sx={{fontSize:"12px", color:'orange'}}>Bid now</Button>
                                            </ListItems>
                                    </Lists>
                                </CardContents>
                            </Cards>
                        </GridItems>
                    </GridContainer>
                </AuctionContent>
            </div>
        </>
    );
};

export default UserAuctions;
