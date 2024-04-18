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

} from "@mui/material";
import axios from "../../utils/AxiosInstance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import Countdown from "react-countdown";


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

const ShowAllBids = () => {
  const [bidData, setBidData] = useState([]);

  const fetchBidData = async () => {
    try {
      const bidData = await axios.get("/api/getbids");

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

  return (
    <Maincontainer>
      <div>
      
          <GridContainer container spacing={2}>
            {bidData.map((data, index) => (
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
                            renderer={({
                              days,
                              hours,
                              minutes,
                              seconds,
                              completed,
                            }) => {
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
                      </ListItems>
                    </Lists>
                  </CardContents>
                </Cards>
              </GridItems>
            ))}
          </GridContainer>
       
      </div>
    </Maincontainer>
  );
};

export default ShowAllBids;
