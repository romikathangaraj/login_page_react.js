import React, { useState } from 'react';
import { Box, Grid} from "@mui/system";
import { useNavigate } from 'react-router-dom'
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const [errors,setErrors] = useState({
    email: '',
    password: '',
  });
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    if (!credentials.email) {
        tempErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
        tempErrors.email = 'Email is not valid';
        isValid = false;
      }
  
      // Password validation
      if (!credentials.password) {
        tempErrors.password = 'Password is required';
        isValid = false;
      } else if (credentials.password.length < 6) {
        tempErrors.password = 'Password must be at least 6 characters';
        isValid = false;
      }
  
      setErrors(tempErrors);
      return isValid;
    };
  
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm())
    {
        console.log('Form submitted successfully:',credentials);
    }
    navigate('/home');
  };

  return (
    <Container maxWidth="xs"
    sx={{
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        mt: 8, 
      }}>
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                sx={{ width: '400px', mb: 2 }}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
                sx={{ width: '400px', mb: 2 }}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent = "flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
