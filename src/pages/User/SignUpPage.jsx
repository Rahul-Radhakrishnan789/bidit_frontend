import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Checkbox,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [isGoogleUser, setisGoogleUser] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  console.log(user);
  console.log(profile);

  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

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

      if (isGoogleUser) {
        const data = {
          username: profile.name,
          email: profile.email,
          isGoogleUser: true,
        };

        const response = await axios.post(
          "http://localhost:5000/api/commonregister",
          data
        );
        console.log(response, "response");

        if (response && response.data.type == "googleuser") {
          localStorage.setItem("useToken", response.data.token);
          navigate("/");
        }
      }

      if (isChecked) {
        const data = {
          username: formData.name,
          email: formData.email,
          password: formData.password,
          isVendor: true,
        };

        const response = await axios.post(
          "http://localhost:5000/api/commonregister",
          data
        );
        console.log(response);
        if (response.status === 201) {
          localStorage.setItem("loginEmail", response.data.data);
          navigate("/login");
        }
      }
      const data = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const response = await axios.post(
        "http://localhost:5000/api/commonregister",
        data
      );
      console.log(response);
      if (response.status === 201) {
        localStorage.setItem("loginEmail", response.data.data);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 301) {
        setErrorMessage("Already registered, please login");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          );
          setProfile(response.data);
          await setisGoogleUser(true);
          await handleRegister();
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);
  console.log("profile", profile);
  // normal form

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    handleRegister();
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
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
            <label>
              Vender
              <Checkbox
                checked={isChecked}
                onChange={handleCheckBoxChange}
                defaultChecked={false}
                color="primary"
                // inputProps={{ 'aria-label': 'isOrganizer' }}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
              />
            </label>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </form>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
        <Box sx={{ mt: "5%" }}>
          <GoogleButton onClick={login} />
        </Box>
      </Container>
    </>
  );
}
