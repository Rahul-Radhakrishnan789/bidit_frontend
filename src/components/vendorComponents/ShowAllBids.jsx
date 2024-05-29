import { useState, useEffect } from "react";
import {
  Box,
  styled,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  CircularProgress,
} from "@mui/material";
import axios from "../../utils/AxiosInstance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

const Maincontainer = styled(Box)`
  background-image: url("https://t3.ftcdn.net/jpg/00/98/52/26/360_F_98522695_S9vAeY8a3O4AYFUDr2WVlk4eCWrqf7hx.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
  height: 400px;
  width: 100%;
`;
const ImageBox = styled(Box)`
  height: 50%;
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

const ShowAllBids = () => {
  const [bidData, setBidData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedBidId, setSelectedBidId] = useState(null); 
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    auctionDuration: "",
    basePrice: "",

  });

  const nav = useNavigate()


  const fetchBidData = async () => {
    try {
      const vendorId = localStorage.getItem("vendorId");

      const bidData = await axios.get(`/api/getbids/${vendorId}`);

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


  useEffect(() => {
    if (bidData.length > 0 && selectedBidId) {
      const selectedBid = bidData.find((bid) => bid._id === selectedBidId);
      if (selectedBid) {
        setFormData({
          itemName: selectedBid.itemName,
          category: selectedBid.category,
          description: selectedBid.description,
          auctionDuration: selectedBid.auctionDuration,
          basePrice: selectedBid.basePrice,
        });
      } else {
        console.error("Selected bid not found");
      }
    }
  }, [bidData, selectedBidId]);
  

  // delete bids



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteBid = (bidId) => {
    try {
      const response = axios.delete(`/api/deletebid/${bidId}`);

      setBidData((prevUserData) =>
        prevUserData.filter((bid) => bid._id !== bidId)
      );

      console.log(response);
    } catch (error) {
      console.error("Error deleting organizer:", error);
    }
  };

  // edit bids

  const handleEdit = async (e,bidId) => {
    e.preventDefault();
    setLoading(true);
  
try{
  const response = await axios.put(`/api/editbid/${selectedBidId}`, formData);

  setBidData([response.data.data])
  setOpen(false);
  window.location.reload()
  
}  catch(err){
    console.error('Error editing bid:', err);
   }  
  }

  return (
    <Maincontainer>
      <div>
        <GridContainer container spacing={2}>
          {bidData.map((data, index) => (
            <GridItems key={index} item xs={12} sm={6} lg={3}>
              <Cards>
                <ImageBox>
                  <img src={data.images[0]?.url} alt="data Image" />
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
                          renderer={({
                            days,
                            hours,
                            minutes,
                            seconds,
                            completed,
                          }) => {
                            if (completed) {
                              return (
                                <>
                                  <div>Auction ended</div>
                                </>
                              );
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
                    </ListItems>
                  </Lists>
                  <Box>
                  <Button
                    sx={{
                      background: "lightgreen",
                      color: "white",
                      width: "100%",
                    }}
                    onClick={() => nav(`/vendor/bidview/${data?._id}`)}
                  >
                    view details
                  </Button>

                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      margin: 0.5,
                    }}
                  >
                    <Box>
                      <Button
                        onClick={() => {setOpen(true)  
                           setSelectedBidId(data._id)}}
                        sx={{ background: "lightblue", color: "white" }}
                      >
                        EDIT
                      </Button>
                      <Modal open={open} onClose={() => setOpen(false)}>
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
                          }}
                        >
                          <form style={{ width: "100%" }}>
                            <Box sx={sx.form}>
                              <TextField
                                label="Name"
                                name="itemName"
                                value={formData.itemName}
                                onChange={handleChange}
                                required
                                sx={sx.inputBox}
                              />
                              <FormControl fullWidth>
                                <Select
                                  label="Category"
                                  name="category"
                                  value={formData.category}
                                  onChange={handleChange}
                                  required
                                  sx={sx.inputBox}
                                >
                                  <MenuItem value="a">Select Category</MenuItem>
                                  <MenuItem value="jewellery">
                                    Jewellery
                                  </MenuItem>
                                  <MenuItem value="bridalGowns">
                                    Bridal Gowns
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                sx={sx.inputBox}
                              />
                              <TextField
                                label="minimum hour - 100 "
                                name="auctionDuration"
                                value={formData.auctionDuration}
                                onChange={handleChange}
                                type="number"
                                sx={sx.inputBox}
                                required
                              />
                              <TextField
                                label="Base Price"
                                name="basePrice"
                                value={formData.basePrice}
                                onChange={handleChange}
                                type="number"
                                required
                                sx={sx.inputBox}
                              />
                              <Button
                                sx={sx.submitButton}
                                type="submit"
                                variant="contained"
                                onClick={(e) => handleEdit(e,data._id)}
                              >
                                Apply changes
                              </Button>
                            </Box>
                          </form>
                        </Box>
                      </Modal>
                    </Box>
                    <Box>
                      <Button
                        sx={{ background: "red", color: "white" }}
                        onClick={() => handleDeleteBid(data._id)}
                      >
                        DELETE
                      </Button>
                    </Box>
                  </Box>
                </CardContents>
              </Cards>
            </GridItems>
          ))}
        </GridContainer>
      </div>
    </Maincontainer>
  );
};
const sx = {
  mainContainer: {
    maxWidth: { xs: "100%", sm: "70%", md: "50%" },
    display: "flex",
    justifyContent: "space-between",
    overflow: "scroll",
    margin: "0 auto",
    padding: { xs: "0", sm: "10px" },
  },
  inputBox: {
    backgroundColor: "white",
    marginBottom: "5%",
    borderRadius: "10px",
  },
  submitButton: {
    width: "100%",
    marginTop: "5%",
    boxShadow: "0px 11px 16.799999237060547px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    fontSize: { xs: 10, sm: 14, md: 14, lg: 14 },
    textTransform: "none",
    color: "#fff",
    fontFamily: "var(--font-dmsanslight)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "5%",
    background: "#BFBFBF",
    borderRadius: "10px",
  },
};

export default ShowAllBids;
