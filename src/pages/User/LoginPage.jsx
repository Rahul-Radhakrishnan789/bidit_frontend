import React, { useState } from "react";
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
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginEmail = localStorage?.getItem("loginEmail");
  const [formData, setFormData] = useState({
    email: `${loginEmail}`,
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const validateForm = () => {
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    } else if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Handle form submission logic here

      const isValid = validateForm();
      if (!isValid) return;

      if (isChecked) {
        const Data = {
          email: formData.email,
          password: formData.password,
          isVendor: true,
        };
        const response = await axios.post(
          "http://localhost:5000/api/commonlogin",
          Data
        );
        if (response && response.data.type === "ventor") {
          await localStorage.removeItem("loginEmail");
          await localStorage.setItem("vendorToken", response.data.data);
          await localStorage.setItem("vendorId", response.data.Id);

          // replace this with new navigation
          //navigate("/ventordashboard")
          window.location.assign(
            "https://www.youtube.com/watch?v=NswcGeJXIO0&ab_channel=Portmukk"
          );
        }
      }
      const Data = {
        email: formData.email,
        password: formData.password,
        isVendor: false,
      };
      const response = await axios.post(
        "http://localhost:5000/api/commonlogin",
        Data
      );
      if (response && response.data.type === "user") {
        await localStorage.removeItem("loginEmail");
        await localStorage.setItem("userToken", response.data.data);
        await localStorage.setItem("userId", response.data.Id);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 403) {
        setErrorMessage("invalid password");
      }
      if (error.response.status === 301) {
        setErrorMessage("PleaseRegister your account");
      }

      console.log(error);
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Container maxWidth="xs">
        <Box sx={{ mt: 15 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              name="email"
              defaultValue={loginEmail}
              value={loginEmail}
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
              <Box> <label>
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
            <Box><Link onClick={() => navigate("/signup")}>already have an account ? Register</Link></Box>
            </Box>
           

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
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
};

export default LoginPage;
