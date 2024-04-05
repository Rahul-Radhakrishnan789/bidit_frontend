import React, { useState } from "react";
import { Tabs, Tab, Box, styled, Typography } from "@mui/material";

import UserTable from "../../components/adminComponents/UserTable";
import VentorTable from "../../components/adminComponents/VentorTable";

const ContentBox = styled(Box)`
    background-color: #d4bfbf;
    padding: 20px 60px;
    min-height: 90vh;
`;

const AdminHomePage = () => {
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant={"h4"} sx={{ position: "absolute", left: { xs: "0", sm: "20px" }, top: 0 }}>
                Admin
            </Typography>
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
                {/* <Tab value="three" label="Item Three" /> */}
            </Tabs>
            <ContentBox>{value === 1 ? <UserTable /> : <VentorTable />}</ContentBox>
        </Box>
    );
};

export default AdminHomePage;
