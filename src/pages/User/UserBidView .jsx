import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/AxiosInstance";
import {
  Box,
  styled,
  Grid,
  Typography,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Breadcrumbs,
} from "@mui/material";
import Navbar from "../../components/userComponents/Navbar";
import Footer from "../../components/userComponents/Footer";

// -----------------styles---------------
const Maincontainer = styled(Box)`
  padding: 1rem;
  font-family: "Nunito Sans", sans-serif;
`;
const SubContainer = styled(Box)`
  padding: 1rem;
  min-height: 240vh;

  .head_desc {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    gap: 0.5rem;
  }

  .head_desc .head {
    width: 100%;
    display: flex;
  }
  .head_desc .head h3 {
    width: fit-content;
  }
  .head_desc .desc {
    padding-left: 1rem;
  }
`;
const Gridcontainer = styled(Grid)``;
const GridItems = styled(Grid)``;

const FirstItem = styled(Box)`
  .bid_history {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 2.5rem 0 1.1rem 0;
    align-items: center;
  }
  .bid_history p {
    font-size: 17px;
    font-weight: 700;
  }

  .bid_history span {
    font-size: 14px;
  }
`;
const BidCard = styled(Box)`
  background-color: rgb(238, 238, 238);
  border-radius: 10px;
  overflow: hidden;
`;
const TimeLeft = styled(Box)`
  display: flex;
  width: 100%;
  align-items: flex-start;
  /* background-color: aliceblue; */
  padding: 20px;
  border-bottom: 1px solid white;

  .right {
    display: flex;
    flex-direction: column;
  }
  #ending {
    margin-top: 2rem;
  }
  .countdown .countbox {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .count {
    display: flex;
    flex-direction: column;
    width: fit-content;
    align-items: center;
    gap: 2px;
  }

  .count .num {
    font-size: 30px;
  }
  .count .text {
    font-size: 12px;
  }

  .countbox .colan {
    font-size: 30px;
  }
`;
const CurretBid = styled(Box)`
  padding: 20px;

  .bid_details {
    display: flex;
  }
  .bid_place .textfield_btn {
    display: flex;
    height: 35px;
    justify-content: space-between;
    gap: 1rem;
  }

  .bid_place #btn {
    background-color: #ff4e4e;
  }

  .bid_place #textfield {
    padding: 0;
    margin: 0;
    outline: none;
    font-size: 18px;
    flex: 1;
    min-width: 100px;
  }
  .bid_place #guideLink {
    font-size: 15px;
  }
  .bid_place #guideLink span a {
    text-decoration: none;
    color: #01afa1;
  }

  .bid_place .agree-check {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px 0 7px 0;
    font-size: 15px;
    gap: 1rem;
  }

  .bid_place .agree-check .check-content {
    display: flex;
    flex-direction: column;
  }
  .bid_place .agree-check .check-content span {
    font-weight: 700;
  }
  .right {
    display: flex;
    flex-direction: column;
  }
  .right #price {
    font-size: 30px;
  }
  .right #user {
    margin-top: 0.5rem;
  }
`;

const SecondItem = styled(Box)``;

// ----------styles------------

const UserBidView = () => {
  const { id } = useParams();

  const [amount, setAmount] = useState();
  const [bidData, setBidData] = useState([]);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ------------
  const uniqueUsers = new Set(bidData.bidders?.map((user) => user.userId?._id));
  const uniqueUserCount = uniqueUsers.size;

  const finalBid =
    bidData.bidders && bidData.bidders.length > 0
      ? bidData.bidders[bidData.bidders.length - 1].amount
      : null;
  const finalBidUser =
    bidData.bidders && bidData.bidders.length > 0
      ? bidData.bidders[bidData.bidders.length - 1].userId?.username
      : null;
  // -------------

    const placeBid = async () => {
        if (amount > finalBid && amount > bidData?.basePrice) {
            try {
                const userId = localStorage.getItem("userId");
                const response = await axios.post(`/api/placebid/${userId}/${id}`, {
                    amount,
                });

        console.log("response", response.data.data);
        setAmount();
      } catch (err) {
        console.error("posting bid error:", err);
        console.log("Response:", err.response);
      }
    } else {
      alert(`place your Bid Greater than ${finalBid}`);
    }
  };

  const fetchDatas = async (req, res) => {
    const data = await axios.get(`/api/fetchdata/${id}`);

    setBidData(data.data.data);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // bid ending -------------

  const timeOut = async () => {
    try {
      const response = await axios.post(`/api/savehighestbidder/${id}`);

      console.log(response.data.data);
    } catch (err) {
      console.error("posting bid error:", err);
      console.log("Response:", err.response);
    }
  };



  // timer ---------------------

  const timer = () => {
    const intervalId = setInterval(() => {
      const endTimeMs =
        new Date(bidData?.startTime).getTime() +
        bidData?.auctionDuration * 3600000;
      const remainingTimeMs = endTimeMs - Date.now();

      if (remainingTimeMs <= 0) {
        clearInterval(intervalId);
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        timeOut()
      } else {
        const days = Math.floor(remainingTimeMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remainingTimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTimeMs % (1000 * 60)) / 1000);

        setRemainingTime({
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        });
      }
    }, 1000);
  };

  useEffect(() => {
    if (bidData.length !== 0) {
      timer();
    }
  }, [bidData]);

  // timer ---------------------

  
  
    return (
        <Maincontainer>
            <Box sx={{ position: "sticky", top: 0, background: "white" }}>
                <Navbar />
            </Box>
            <SubContainer sx={{ padding: { xs: 0, sm: "1rem" } }}>
                <Box className="head_desc">
                    {/* <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to={'/'} >
                            home
                        </Link>
                        <Link underline="hover" color="inherit" to={'/user/auctions'}>
                            Auction
                        </Link>
                    </Breadcrumbs>   */}
            <Box
              className="head"
              sx={{
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "center" },
                gap: { xs: ".5rem", md: "1rem" },
              }}
            >
              <Typography variant="h3">{bidData.itemName}</Typography>
              <Chip
                sx={{
                  height: "fit-content",
                  width: "fit-content",
                  padding: "5px 0",
                  color: "white",
                  background: "lightBlue",
                  fontWeight: "700",
                  borderRadius: "10px",
                  fontSize: "12px",
                  // display:'none'
                  display: `${
                    remainingTime.hours == 0 &&
                    remainingTime.hours == 0 &&
                    remainingTime.minutes == 0 &&
                    remainingTime.seconds == 0
                      ? "Block"
                      : "none"
                  }`,
                }}
                label="SOLD"
              />
            </Box>
            <Box className="desc">
              <Typography>{bidData.description}</Typography>
            </Box>
          </Box>
          <Gridcontainer container spacing={{ xs: 5, lg: 2 }}>
            <GridItems item xs={12} lg={6}>
              <FirstItem>
                <BidCard>
                  <TimeLeft
                    sx={{
                      flexDirection: { xs: "column", md: "row" },
                      gap: { xs: "1rem", md: "4rem" },
                    }}
                  >
                    <Box className="left">
                      <Typography>Time Left</Typography>
                    </Box>
                    <Box className="right">
                      <Box className="countdown">
                        <Box className="countbox">
                          <Box className="count">
                            <span className="num">{remainingTime.days}</span>
                            <span className="text">days</span>
                          </Box>
                          <Box className="colan">:</Box>
                          <Box className="count">
                            <span className="num">{remainingTime.hours}</span>
                            <span className="text">hours</span>
                          </Box>
                          <Box className="colan">:</Box>
                          <Box className="count">
                            <span className="num">{remainingTime.minutes}</span>
                            <span className="text">min</span>
                          </Box>
                          <Box className="colan">:</Box>
                          <Box className="count">
                            <span className="num">{remainingTime.seconds}</span>
                            <span className="text">sec</span>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </TimeLeft>
                  <CurretBid>
                    <Box
                      className="bid_details"
                      sx={{
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: "1rem", md: "3rem" },
                      }}
                    >
                      <Box className="left">
                        <Typography>Current Bid</Typography>
                      </Box>
                      <Box className="right">
                        <span id="price">₹ {finalBid}</span>
                        <p id="user">
                          from <span>{finalBidUser}</span>{" "}
                        </p>
                        <p style={{ margin: "0 0 16px 0" }}>
                          base price : ₹ {bidData.basePrice}
                        </p>
                      </Box>
                    </Box>
                    <Box
                      className="bid_place"
                      sx={{
                        display: `${
                          remainingTime.hours == 0 &&
                          remainingTime.hours == 0 &&
                          remainingTime.minutes == 0 &&
                          remainingTime.seconds == 0
                            ? "none"
                            : "block"
                        }`,
                      }}
                    >
                      <Box className="textfield_btn">
                        <input
                          id="textfield"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="place your bid"
                        />
                        <Button
                          id="btn"
                          variant="contained"
                          disableElevation
                          onClick={placeBid}
                        >
                          Place Bid
                        </Button>
                      </Box>
                      <p id="guideLink">
                        Learn more about how bidding works in our{" "}
                        <span>
                          {" "}
                          <Link to={""}>auction bidding guide.</Link>
                        </span>
                      </p>
                      <Box className="agree-check">
                        <Box>
                          <Checkbox />
                        </Box>
                        <Box className="check-content">
                          <span>I agree to pay if I win this domain</span> An
                          additional fee of ₹15.88 will be added to the final
                          purchase price for one year of registration for this
                          .com domain.
                        </Box>
                      </Box>
                    </Box>
                  </CurretBid>
                </BidCard>
                <Box className="bid_history">
                  <Typography>BID HISTORY</Typography>
                  <span>
                    {bidData.bidders?.length} bids, {uniqueUserCount} bidders
                  </span>
                </Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Bidder</TableCell>
                        <TableCell>Bid (INR)</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bidData.bidders?.map((user, index) => {
                        const bidTime = new Date(user.timeOfBid);
                        const formattedTime = bidTime.toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "numeric",
                        });
                        const formattedDate = bidTime.toLocaleDateString([], {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        });
                        const displayTime = `${formattedDate} at ${formattedTime}`;

                        return (
                          <TableRow key={index}>
                            <TableCell>{user.userId?.username}</TableCell>
                            <TableCell>₹ {user.amount}</TableCell>
                            <TableCell>{displayTime}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </FirstItem>
            </GridItems>
            <GridItems item xs={12} lg={6}>
              <SecondItem>
                <Gridcontainer container spacing={2}>
                  {bidData.images?.map((image, index) => (
                    <GridItems key={index} item xs={12} sm={6}>
                      <Box>
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "20px",
                          }}
                          src={image.url}
                          alt=""
                        />
                      </Box>
                    </GridItems>
                  ))}
                </Gridcontainer>
              </SecondItem>
            </GridItems>
          </Gridcontainer>
        </SubContainer>
        <Footer  />
      </Maincontainer>
    );
};

export default UserBidView;
