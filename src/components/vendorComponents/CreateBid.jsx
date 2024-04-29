import React from "react";
import { useState } from "react";
import axios from "../../utils/AxiosInstance";
import { Box, Button, FormControl, MenuItem, Select, TextField, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateBid() {
    const [formData, setFormData] = useState({
        itemName: "",
        category: "a",
        description: "",
        auctionDuration: null,
        basePrice: null,
        images: [],
    });

    // --taost--------------------
    const [open, setOpen] = useState(false);
    const handleClick = () => {
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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        setFormData({
            ...formData,
            images: files,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("main form data", formData);
        try {
            const formDataToSend = new FormData();

            const vendorId = localStorage.getItem("vendorId");

            for (const key in formData) {
                if (key === "images") {
                    for (let i = 0; i < formData.images.length; i++) {
                        formDataToSend.append("images", formData.images[i]);
                    }
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            if (!formData.itemName || !formData.basePrice) {
                alert("Please fill in all required fields!");
                return;
            }
            const response = await axios.post(`/api/createBid/${vendorId}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Registration successful:", response.data);

            console.log("Submitting form:", formData);
        } catch (error) {
            console.error("Bid Registration error:", error);
            console.log("Response:", error.response);
        }
        setFormData({
            itemName: "",
            category: "",
            description: "",
            auctionDuration: "",
            basePrice: "",
            images: "",
        });

        handleClick();
    };

    return (
        <Box sx={sx.mainContainer}>
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <Box sx={sx.form}>
                    <h2 style={{ color: "#0c1022" }}>Create New Bid</h2>
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
                            <MenuItem value="jewellery">Jewellery</MenuItem>
                            <MenuItem value="bridalGowns">Bridal Gowns</MenuItem>
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
                    <input
                        required={true}
                        type="file"
                        name="images"
                        accept=".png, .jpg, .jpeg"
                        maxfilesize={10000000}
                        multiple
                        onChange={handleImageUpload}
                    />
                    <p>choose 5 images</p>
                    <Button sx={sx.submitButton} type="submit" variant="contained">
                        Submit
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Bid item Created"
                action={action}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </Box>
    );
}

const sx = {
    mainContainer: {
        maxWidth: { xs: "100%", sm: "70%", md: "50%" },
        display: "flex",
        justifyContent: "space-between",
        overflow: "hidden",
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
