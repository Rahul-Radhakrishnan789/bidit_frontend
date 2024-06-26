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
    Typography,
    Modal
} from "@mui/material";
import axios from "../../utils/AxiosInstance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Navbar from "../../components/userComponents/Navbar";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

const Maincontainer = styled(Box)`
    background-image: url("https://t3.ftcdn.net/jpg/00/98/52/26/360_F_98522695_S9vAeY8a3O4AYFUDr2WVlk4eCWrqf7hx.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const SideBars = styled(Sidebar)`
    .ps-sidebar-container {
        background: transparent;
        border-right: 1px solid black;

    }
    
`;

const AuctionContent = styled(Box)`
    /* background-color: #dddbdb; */
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 0;
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
    const navigate = useNavigate();
    const [bidData, setBidData] = useState([]);

    const userId = localStorage.getItem("userId")
    

    const [filters, setFilters] = useState({
        jewellery: false,
        bridalGowns: false,
    });

    const filterBidData = () => {
        let filteredData = bidData;

        if (filters.jewellery) {
            filteredData = filteredData.filter((item) => item.category === "jewellery");
        }
        if (filters.bridalGowns) {
            filteredData = filteredData.filter((item) => item.category === "bridalGowns");
        }
        return filteredData;
    };

    const fetchBidData = async () => {
        try {
            const bidData = await axios.get("/api/getallbids");

            console.log("bidDta", bidData.data.data);

            setBidData(bidData.data.data);
        } catch (err) {
            console.error("bids fetching error:", err);
            console.log("Response:", err.response);
        }
    };

    useEffect(() => {
        fetchBidData();
    }, []);

    const handleCheckboxClick = (filterName, checked) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: checked,
        }));
    };


    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
    return (
        <>
           {userId ? (
        <Maincontainer>
            <Box sx={{ position: "sticky", top: "0", background: "white", zIndex: "999" }}>
                <Navbar />
            </Box>
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

                        <Tooltip title="Jewellery" placement="right" arrow>
                            <MenuItem>
                                <span>
                                    <Checkbox
                                        onClick={(e) => handleCheckboxClick("jewellery", e.target.checked)}
                                        checked={filters.jewellery}
                                    />
                                </span>
                                <span>Jewellery</span>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip title="Bridal Gowns" placement="right" arrow>
                            <MenuItem>
                                <span>
                                    <Checkbox
                                        onClick={(e) => handleCheckboxClick("bridalGowns", e.target.checked)}
                                        checked={filters.bridalGowns}
                                    />
                                </span>
                                <span>Bridal Gowns</span>
                            </MenuItem>
                        </Tooltip>
                       
                    </Menu>
                </SideBars>
                <AuctionContent>
                    <GridContainer container spacing={2}>
                        {filterBidData().map((data, index) => (
                            <GridItems key={index} item xs={12} sm={6} lg={3}>
                                <Cards>
                                    <ImageBox>
                                        <img src={data.images[3]?.url} alt="data Image" />
                                    </ImageBox>
                                    <CardContents>
                                        <Lists>
                                            <ListItems>
                                                <ListItemIcon className="listIcon">
                                                    <TurnedInIcon style={{ height: "18px" }} />
                                                </ListItemIcon>
                                                <ListItemText secondary={data.itemName} />
                                            </ListItems>
                                            <ListItems>
                                                <ListItemIcon className="listIcon">
                                                    <CurrencyRupeeIcon style={{ height: "18px" }} />
                                                </ListItemIcon>
                                                <ListItemText secondary={data.basePrice} />
                                            </ListItems>
                                            <ListItems id="listPlace">
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <ListItemIcon className="listIcon">
                                                        <TimelapseIcon style={{ height: "18px" }} />
                                                    </ListItemIcon>
                                                    <Countdown
                                                        date={
                                                            Date.now() +
                                                            (new Date(data.startTime).getTime() +
                                                                data.auctionDuration * 3600000 -
                                                                Date.now())
                                                        }
                                                        renderer={({ days, hours, minutes, seconds, completed }) => {
                                                            if (completed) {
                                                                return <span>Auction ended</span>;
                                                            } else {
                                                                return (
                                                                    <span>
                                                                        {days}d {hours}h {minutes}m {seconds}s
                                                                    </span>
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </Box>
                                                <Button
                                                    onClick={() => navigate(`/user/auctions/bid/${data._id}`)}
                                                    sx={{ fontSize: "12px", color: "orange" }}
                                                >
                                                    Details
                                                </Button>
                                            </ListItems>
                                        </Lists>
                                    </CardContents>
                                </Cards>
                            </GridItems>
                        ))}
                    </GridContainer>
                </AuctionContent>
            </div>
        </Maincontainer>
          ) : (
            <>
            <Navbar/>
            <Modal
                      open={!open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 400,
                          bgcolor: "background.paper",
                          boxShadow: 24,
                          p: 4,
                          borderRadius: "20px",
                        }}
                      >
                        <Typography
                          id="modal-modal-description"
                          variant="h5"
                          sx={{ color: "black", textAlign: "center" }}
                        >
                          Please Login
                        </Typography>
                        <span
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                           onClick={() => navigate("/signup")}
                            sx={{ mt: 2, color: "green" }}
                          >
                            OK
                          </Button>
                          
                        </span>
                      </Box>
                    </Modal>
                    </>
          )}
        </>
    );
};

export default UserAuctions;
