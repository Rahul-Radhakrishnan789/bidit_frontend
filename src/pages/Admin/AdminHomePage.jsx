import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, styled, Typography } from "@mui/material";
import UserTable from "../../components/adminComponents/UserTable";
import VentorTable from "../../components/adminComponents/VentorTable";
import ShowWinners from "../../components/adminComponents/WinnerTable";
import ShowAllBids from "../../components/adminComponents/ShowAllProducts";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/AxiosInstance";

const ContentBox = styled(Box)`
  background-color: #d4bfbf;
  padding: 20px 60px;
  min-height: 90vh;
`;

const AdminHomePage = () => {
  const [value, setValue] = useState(1);

  const [userData, setUserData] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [winnersData, setWinnersData] = useState([]);
  const [bidData, setBidData] = useState([]);


  const nav = useNavigate();



  const fetchBidData = async () => {
    try {
    

      const bidData = await axios.get(`/api/getallbids`);

      console.log("bidDta", bidData.data.data);

      setBidData(bidData.data.data);
    } catch (err) {
      console.error("bids fetching error:", err);
      console.log("Response:", err.response);
    }
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchUserData = async () => {
    try {
      const userData = await axios.get("/api/getusers");
      setUserData(userData.data.data);
    } catch (err) {
      console.error("users fetching error:", err);
    }
  };

  const fetchVendorData = async () => {
    try {
      const vendorData = await axios.get("/api/getvendors");
      setVendorData(vendorData.data.data);
    } catch (err) {
      console.error("vendors fetching error:", err);
    }
  };

  const fetchWinnersData = async () => {
    try {
      const winnersData = await axios.get("/api/getallwinners");
      setWinnersData(winnersData.data.data);
      console.log("winnersData", winnersData.data.data);
    } catch (err) {
      console.error("winners fetching error:", err);
    }
  };

  useEffect(() => {
    if (value === 1) {
      fetchUserData();
    } else if (value === 2) {
      fetchVendorData();
    } else if (value === 3) {
      fetchWinnersData();
    } else if (value === 4) {
      fetchBidData();
    }

  }, [value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          left: { xs: "0", sm: "20px" },
          top: 10,
          cursor: "pointer",
        }}
        onClick={() => nav("/")}
      >
        <img width={80} src="/logo.png" alt="" />
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
        centered
        sx={{ width: "100%" }}
      >
        <Tab value={1} label="Users" />
        <Tab value={2} label="Vendors" />
        <Tab value={3} label="Winners" />
        <Tab value={4} label="All Products" />
      </Tabs>
      <ContentBox>
 
        {value === 1 ? (
          <UserTable userData={userData} />
        ) : value === 2 ? (
          <VentorTable vendorData={vendorData} />
        ) : value === 3 ? (
          <ShowWinners winnersData={winnersData} />
        ) : <ShowAllBids bidData={bidData} /> }
      </ContentBox>
    </Box>
  );
};

export default AdminHomePage;
