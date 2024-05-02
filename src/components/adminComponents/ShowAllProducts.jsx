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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
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
  height: 65vh;
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

const ShowAllBids = ({bidData}) => {

console.log(bidData)

  return (
    <Maincontainer>
      <div>
        <GridContainer container spacing={2}>
          {bidData.map((data, index) => (
            <GridItems key={index} item xs={12} sm={6} lg={3}>
              <Cards>
                <ImageBox>
                  <img src={data.images[2]?.url} alt="data Image" />
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
                    <ListItems>
                      <ListItemIcon className="listIcon">
                        <PersonAddAltIcon style={{ height: "18px" }} />
                      </ListItemIcon>
                      <ListItemText secondary={data?.vendorId?.username} />
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
