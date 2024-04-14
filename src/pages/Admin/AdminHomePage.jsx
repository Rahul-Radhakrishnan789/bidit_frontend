import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, styled, Typography } from "@mui/material";
import UserTable from "../../components/adminComponents/UserTable";
import VentorTable from "../../components/adminComponents/VentorTable";
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

  const [vendorData,setVendorData] = useState([]);

  const nav = useNavigate()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchUserData = async () => {
        try {
            const userData = await axios.get("/api/getusers");

            setUserData(userData.data.data);
            console.log("userData", userData.data.data);
        } catch (err) {
            console.error("users fetching error:", err);
            console.log("Response:", err.response);
        }
    };

    const fetchVendorData = async () => {
        try {
            const vendorData = await axios.get("/api/getvendors");

            setVendorData(vendorData.data.data);
            console.log("vendorData", vendorData.data.data);
        } catch (err) {
            console.error("vendors fetching error:", err);
            console.log("Response:", err.response);
        }
    };

    useEffect(() => {
        if (value === 1) {
            fetchUserData();
        } else {
            fetchVendorData();
        }
    }, [value]);

  return (
    <Box sx={{ width: "100%", }} >
      <Box
        sx={{ position: "relative", left: { xs: "0", sm: "20px" }, top: 10 ,cursor:'pointer' }}
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
        <Tab value={2} label="Ventors" />
      </Tabs>
      <ContentBox>{value === 1 ? <UserTable userData={userData} /> : <VentorTable vendorData={vendorData} />}</ContentBox>
    </Box>
  );
};

export default AdminHomePage;
