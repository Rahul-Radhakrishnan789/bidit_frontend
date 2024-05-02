import React, { useEffect, useState } from "react";
import { Box, styled, Grid, Card, Typography, Button, Snackbar, IconButton,Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "../../components/userComponents/Navbar";
import Footer from "../../components/userComponents/Footer";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/AxiosInstance";

// -------styles--------------

const Maincontainer = styled(Box)`
    /* background: red; */
    
`;
const Subcontainer = styled(Box)`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-image: url("https://t3.ftcdn.net/jpg/00/98/52/26/360_F_98522695_S9vAeY8a3O4AYFUDr2WVlk4eCWrqf7hx.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;
const ItemCard = styled(Card)`
    padding: 0.7rem;
`;
const GridContainer = styled(Grid)``;
const GridItems = styled(Grid)``;

const ImageAndDesc = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`;

const Image = styled(Box)`
    height: 250px;
    width: 100%;
    /* background: yellow; */
    img {
        height: 100%;
        width: 100%;
    }
`;

const BidContent = styled(Box)`
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title_price {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    button {
        background: black;
    }
    button:hover {
        background: #000000b9;
    }
`;
// ---------styles---------

const UserBids = () => {
    const [datas, setDatas] = useState([]);
    const [itemsID, setItemsID] = useState({
        itmId: "",
        amount: undefined,
    });

    const userId = localStorage.getItem("userId")

    // --taost--------------------
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon sx={{ border: "none" }} fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // ---------toast-----------

    // payment --------------

    const initPayment = (data) => {
        const options = {
            amount: itemsID.amount,
            currency: data.currency,
            description: "Test Transaction",
            image: "https://img.freepik.com/premium-vector/fast-play-symbol-logo-with-letter-f_45189-7.jpg?w=740",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const additionalCredentials = {
                        amount: itemsID.amount,
                    };
                    const user = localStorage.getItem("userId");

                    console.log("uid", user);

                    const { data } = await axios.post(`/api/paymentfinal/${itemsID.itmId}/${user}`, {
                        ...response,
                        ...additionalCredentials,
                    });
                    console.log(data);
                    if (data) {
                        // handleOrders();
                        fetchData();
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handleClick = (id, amount) => {
        setItemsID({ itmId: id, amount: amount });
        console.log("itemsID", itemsID);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.post("/api/paymentstart", {
                    amount: itemsID?.amount,
                    userId:userId,
                });
                console.log(data);
                initPayment(data.data);
            } catch (error) {
                console.error("error:", error);
            }
        };
        fetchData();
    }, [itemsID.itmId, itemsID.amount,userId]);

    // fetch data ------------

    const fetchData = async () => {
        const userId = localStorage.getItem("userId");

        const response = await axios.get("/api/fetchuserbids");

        const usersBids = response.data.data.filter((data) => data.highestBidderId.userId == userId);

        setDatas(usersBids);

        // console.log("responseData", usersBids);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // const { highestBidderId, itemId, _id,} = datas[0];
    console.log(datas);


    const nav = useNavigate();

    return (
        <>
        {userId ? (
        <Maincontainer sx={{ padding: { xs: "0 .5rem", sm: "0 1rem" } }}>
            <Box sx={{ position: "sticky", top: "0", background: "white", zIndex: "1" }}>
                <Navbar />
            </Box>
            <Subcontainer sx={{ padding: { xs: "1rem .5rem", sm: "1rem 3rem" } }}>
                {datas.map((item, index) => (
                    <ItemCard key={index}>
                        <GridContainer container spacing={2}>
                            <GridItems item xs={12} md={6}>
                                <ImageAndDesc sx={{ bgcolor: "" }}>
                                    <Image>
                                        <img src={item.highestBidderId?.bidItem?.images[0]?.url} alt="" />
                                    </Image>
                                    <Typography sx={{ padding: { xs: "0 .5rem", sm: "0 2rem" }, alignSelf: "flex-start" }}>
                                        {item.highestBidderId.bidItem.description}
                                    </Typography>
                                </ImageAndDesc>
                            </GridItems>
                            <GridItems item xs={12} md={6}>
                                <BidContent sx={{ padding: { xs: "1rem", sm: "2rem" }, gap: { xs: "1rem", md: "0" } }}>
                                    <Box className="title_price">
                                        <Typography variant="h3">{item.highestBidderId.bidItem.itemName}</Typography>
                                        <Typography variant="h5">Bid Price: ₹ {item.highestBidderId.amount}</Typography>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            item.paid
                                                ? handleOpen()
                                                : handleClick(item.itemId, item.highestBidderId.amount);
                                        }}
                                    >
                                        {item.paid ? "paid" : "pay now"}
                                    </Button>
                                </BidContent>
                            </GridItems>
                        </GridContainer>
                    </ItemCard>
                ))}
            </Subcontainer>
            <Footer />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="already paid"
                action={action}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
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
                           onClick={() => nav("/signup")}
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

export default UserBids;
