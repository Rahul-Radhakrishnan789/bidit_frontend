import React from "react";
import { Box, Container, Typography, Link, TextField, Button, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box sx={{ width: "100%", borderTop: "1px solid", background:'white' }}>
            <Container sx={{ paddingTop: "3.7rem", paddingBottom: "1.7rem" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3} sx={sx.gridStyle}>
                        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                            Info
                        </Typography>

                        <Link href="#" sx={sx.linkStyle}>
                            About Us
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Compressions
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Customers
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Service
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Collection
                        </Link>
                    </Grid>

                    {/* Explore */}
                    <Grid item xs={12} sm={6} md={3} sx={sx.gridStyle}>
                        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                            Explore
                        </Typography>

                        <Link href="#" sx={sx.linkStyle}>
                            Free Designs
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Latest Designs
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Themes
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Popular Designs
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Art Skills
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            New Uploads
                        </Link>
                    </Grid>

                    {/* Legal */}
                    <Grid item xs={12} sm={6} md={3} sx={sx.gridStyle}>
                        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                            Legal
                        </Typography>

                        <Link href="#" sx={sx.linkStyle}>
                            Customer Agreement
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Privacy Policy
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            GDPR
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Security
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Testimonials
                        </Link>
                        <Link href="#" sx={sx.linkStyle}>
                            Media Kit
                        </Link>
                    </Grid>

                    {/* Newsletter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                            Newsletter
                        </Typography>
                        <Typography sx={{ marginBottom: "1rem" }}>
                            Subscribe to our newsletter for a weekly dose of news, updates, helpful tips, and exclusive
                            offers.
                        </Typography>
                        <form>
                            <TextField sx={{ width: "100%", marginBottom: "1rem" }} placeholder="Your email" required />
                            <Button type="submit" variant="contained" sx={{ width: "100%", marginBottom: "1rem" }}>
                                SUBSCRIBE
                            </Button>
                        </form>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            <IconButton>
                                <Facebook />
                            </IconButton>
                            <IconButton>
                                <Twitter />
                            </IconButton>
                            <IconButton>
                                <LinkedIn />
                            </IconButton>
                            <IconButton>
                                <GitHub />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;

const sx = {
    linkStyle: {
        textDecoration: "none",
        color: "black",
    },
    gridStyle: {
        textAlign: "center",
        flexDirection: "column",
        display: "flex",
        gap: "10px",
    },
};
