import React, { useState } from "react";
import { Box, useMediaQuery, Popover, Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
    const nav = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width:850px)");
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [logout,setLogout] = useState(false)

    const handleButtonClick = (event) => {
        setPopoverAnchor(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setPopoverAnchor(null);
    };

    const openPopover = Boolean(popoverAnchor);

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1%",
                }}
            >
                <Box sx={sx.logoStyle} onClick={() => nav("/")}>
                    <img width={75} src="/logo.png" alt="" />
                </Box>
                <button
                    onClick={handleButtonClick}
                    style={{
                        display: isSmallScreen ? "block" : "none",
                        paddingLeft: "10px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        position: "relative",
                    }}
                >
                    <MenuIcon style={{ color: "Black" }} />
                </button>

                <Popover
                    open={openPopover}
                    anchorEl={popoverAnchor}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "10px",
                        }}
                    >
                        <Button href="#" color="inherit" sx={sx.popoverButton} onClick={() => nav("/user/auctions")}>
                            Auctions
                        </Button>
                        <Button href="#" color="inherit" sx={sx.popoverButton} onClick={() => nav("/adminlogin")}>
                            Admin
                        </Button>
                        <Button href="#" color="inherit" sx={sx.popoverButton} onClick={() => nav("/user/mybids")}>
                            My Bids
                        </Button>
                        <Button href="#" color="inherit" sx={sx.popoverButton}>
                            Contact
                        </Button>
                        <Button href="#" color="inherit" sx={sx.popoverButton} onClick={() => nav("/signup")}>
                            Login&nbsp;/&nbsp;Register
                        </Button>
                    </div>
                </Popover>
                {!isSmallScreen && (
                    <>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={sx.navLinks} onClick={() => nav("/user/auctions")}>
                                Auctions
                            </Box>
                            <Box sx={sx.navLinks}  onClick={() => nav("/adminlogin")} >Admin</Box>
                            <Box sx={sx.navLinks} onClick={() => nav("/user/mybids")}>
                                My&nbsp;Bids
                            </Box>
                            <Box sx={sx.navLinks}>Contact</Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "#23a6f0",
                                cursor: "pointer",
                            }}
                        >
                            {localStorage.getItem("userId") ? (
                                <Box onClick={() => { localStorage.removeItem("userId")
                                 setLogout(true)}}>Logout</Box>
                            ) : (
                                <Button variant="outlined" onClick={() => nav("/signup")}>
                                    Login&nbsp;/&nbsp;Register&nbsp;&nbsp;
                                </Button>
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </div>
    );
}

const sx = {
    navLinks: {
        paddingX: "5%",
        cursor: "pointer",
        display: "flex",
    },
    logoStyle: {
        fontSize: { xs: "18px", sm: "20px", md: "22px", lg: "25px" },
        fontWeight: "600",
        cursor: "pointer",
        marginLeft: "10%",
    },
    popoverButton: {
        textTransform: "none",
    },
};
