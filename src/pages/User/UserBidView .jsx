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
} from "@mui/material";


// -----------------styles---------------
const Maincontainer = styled(Box)`
  padding: 1rem;
  font-family: "Nunito Sans", sans-serif;
`;
const SubContainer = styled(Box)`
  padding: 1rem;
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
    /* background-color: red; */
    width: fit-content;
    align-items: center;
    gap: 2px;
  }

  .count .num {
    font-size: 30px;
    /* background-color: red; */
  }
  .count .text {
    font-size: 12px;
  }

  .countbox .colan {
    font-size: 30px;
    /* padding:0 5px; */
  }
`;
const CurretBid = styled(Box)`
  padding: 20px;

  .bid_details {
    display: flex;
  }
  .bid_place {
    //  display: none;
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
    justify-content: center;
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

  console.log("amount", amount);

  const placeBid = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(`/api/placebid/${userId}/${id}`, {
        amount,
      });

      console.log('response',response.data.data)
      setAmount()
    } catch (err) {
      console.error("posting bid error:", err);
      console.log("Response:", err.response);
    }
  };

  const fetchDatas = async (req,res) => {

    const data = await axios.get(`/api/fetchdata/${id}`)

    console.log(data.data.data)
  }

  useEffect(() => {
    fetchDatas()
  },[])

  return (
    <Maincontainer>
      <SubContainer sx={{ padding: { xs: 0, sm: "1rem" } }}>
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
                          <span className="num">01</span>
                          <span className="text">days</span>
                        </Box>
                        <Box className="colan">:</Box>
                        <Box className="count">
                          <span className="num">06</span>
                          <span className="text">hours</span>
                        </Box>
                        <Box className="colan">:</Box>
                        <Box className="count">
                          <span className="num">41</span>
                          <span className="text">min</span>
                        </Box>
                        <Box className="colan">:</Box>
                        <Box className="count">
                          <span className="num">21</span>
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
                      <span id="price">$710</span>
                      <p id="user">
                        from <span>hercules</span>
                      </p>
                    </Box>
                  </Box>
                  <Box className="bid_place">
                    <Box className="textfield_btn">
                      <input
                        id="textfield"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <Button id="btn" variant="contained" disableElevation onClick={placeBid}>
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
                        additional fee of $15.88 will be added to the final
                        purchase price for one year of registration for this
                        .com domain.
                      </Box>
                    </Box>
                  </Box>
                </CurretBid>
              </BidCard>
              <Box className="bid_history">
                <Typography>BID HISTORY</Typography>
                <span>60 bids, 7bidders</span>
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Bidder</TableCell>
                      <TableCell>Bid (USD)</TableCell>
                      <TableCell>Max Bid</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Sample table rows */}
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>$500</TableCell>
                      <TableCell>$600</TableCell>
                      <TableCell>09:30 AM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>$700</TableCell>
                      <TableCell>$900</TableCell>
                      <TableCell>10:45 AM</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
              </TableContainer>
            </FirstItem>
          </GridItems>
          <GridItems item xs={12} lg={6}>
            <SecondItem>
              <Gridcontainer container spacing={2}>
                <GridItems item xs={12} sm={6}>
                  <Box>
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "20px",
                      }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFx_imqgFIWP8lUUkSPxIx7rnS9rf5cqtfI8KFvGihOQ&s"
                      alt=""
                    />
                  </Box>
                </GridItems>
                <GridItems item xs={12} sm={6}>
                  <Box>
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "20px",
                      }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFx_imqgFIWP8lUUkSPxIx7rnS9rf5cqtfI8KFvGihOQ&s"
                      alt=""
                    />
                  </Box>
                </GridItems>
                <GridItems item xs={12} sm={6}>
                  <Box>
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "20px",
                      }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFx_imqgFIWP8lUUkSPxIx7rnS9rf5cqtfI8KFvGihOQ&s"
                      alt=""
                    />
                  </Box>
                </GridItems>
                <GridItems item xs={12} sm={6}>
                  <Box>
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "20px",
                      }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFx_imqgFIWP8lUUkSPxIx7rnS9rf5cqtfI8KFvGihOQ&s"
                      alt=""
                    />
                  </Box>
                </GridItems>
              </Gridcontainer>
            </SecondItem>
          </GridItems>
        </Gridcontainer>
      </SubContainer>
    </Maincontainer>
  );
};

export default UserBidView;
