import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Checkbox,
  Alert,
  Link
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";

export default function SignUpPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    console.log(user);
    console.log(profile);

    const handleCheckBoxChange = (event) => {
        setIsChecked(event.target.checked);
    };

   
    const validateForm = () => {
        if (!formData.name.trim()) {
            setError("Name is required");
            return false;
        }
        if (!formData.email.trim()) {
            setError("Email is required");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Email address is invalid");
            return false;
        }
        if (!formData.password.trim()) {
            setError("Password is required");
            return false;
        } else if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        try {
            const isValid = validateForm();
            if (!isValid) return;

        
            if (isChecked) {
                const data = {
                    username: formData.name,
                    email: formData.email,
                    password: formData.password,
                    isVendor: true,
                };

                const response = await axios.post("http://localhost:5000/api/commonregister", data);
                console.log(response);
                if (response.status === 201) {
                    localStorage.setItem("loginEmail", response.data.data);
                  navigate("/login")
                }
            }
            const data = {
                username: formData.name,
                email: formData.email,
                password: formData.password,
            };
            const response = await axios.post("http://localhost:5000/api/userRegister", data);
            console.log(response);
            if (response.status === 201) {
                localStorage.setItem("loginEmail", response.data.data);
                const { data } = await axios.post("http://localhost:5000/api/paymentstart", {
                    amount: 1000,
                });
                console.log(data);
                initPayment(data.data);
               
            }
        } catch (error) {
            console.log(error);
          
                setErrorMessage("Already registered, please login");
            
        }
    };

  

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const initPayment = (data) => {
        const options = {
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            image: "https://img.freepik.com/premium-vector/fast-play-symbol-logo-with-letter-f_45189-7.jpg?w=740",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(`http://localhost:5000/api/paymentforregister`, {
                        ...response,
                    });
                    console.log(data);
                    if (data) {
                        navigate("/login");
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
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        handleRegister();
      
    };

    return (
        <>
            <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {errorMessage && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Alert>
                )}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Box>
              <Box><label>
                            Vender
                            <Checkbox
                                checked={isChecked}
                                onChange={handleCheckBoxChange}
                                defaultChecked={false}
                                color="primary"
                                sx={{
                                    color: pink[800],
                                    "&.Mui-checked": {
                                        color: pink[600],
                                    },
                                }}
                            />
                        </label></Box>
              <Box><Link onClick={() => navigate("/login")}>already have an account ? signin</Link></Box>
            </Box>
                  {isChecked ? (  <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Sign Up
                        </Button>) :
                         (  <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                       pay and Sign Up 
                     </Button>)}
                      
                    </form>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </Box>
               
            </Container>
        </>
    );
}
