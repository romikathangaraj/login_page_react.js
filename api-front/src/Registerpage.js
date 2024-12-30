import { Box, Grid } from "@mui/system";
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import{
    Button,
    Typography,
    Container,
    TextField,
    Link

} from '@mui/material';


const RegisterPage = () => {
    const[formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password:''

    });
    const [errors,setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password:''
      });
    const navigate = useNavigate();
    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;
        if (!formData.firstname) {
            tempErrors.firstname = 'firstname is required';
            isValid = false;
          }
        if(!formData.lastname){
            tempErrors.lastname='last name is required';
            isValid = false;
        }

        if (!formData.email) {
            tempErrors.email = 'Email is required';
            isValid = false;
          } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is not valid';
            isValid = false;
          }
          if (!formData.password) {
            tempErrors.password = 'Password is required';
            isValid = false;
          } else if (formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters';
            isValid = false;
          }
          
          setErrors(tempErrors);
          return isValid;
        };
         useEffect(() => {
            setFormData({ firstname:'',lastname:'',email: '', password: '', }); // Reset form inputs
            localStorage.removeItem('authToken'); // Clear auth token
            sessionStorage.clear(); // Clear session storage
          }, []);
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()){
          console.log("form validation done");
          navigate('/');
        }
        else{
          console.log("error");
          alert("user already exists");
        }
        const userData = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password,
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
               
            });
            
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
      
    return(
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
                <Typography component = "h1" variant = "h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} autoComplete="off">
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        id="firstname"
        label="First Name"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        sx={{ mb: 2, width: "400px"}}
        error={!!errors.firstname}
        helperText={errors.firstname}
        autoComplete="off"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        id="lastname"
        label="Last Name"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        sx={{ mb: 2, width: "400px"}}
        error={!!errors.lastname}
        helperText={errors.lastname}
        autoComplete="off"
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        value={formData.email}
        onChange={handleChange}
        sx={{ mb: 2, width: "400px"}}
        error={!!errors.email}
        helperText={errors.email}
        autoComplete="off"
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        sx={{ mb: 2, width: "400px"}}
        error={!!errors.password}
        helperText={errors.password}
        autoComplete="off"
      />
    </Grid>
  </Grid>
  <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
    Register
  </Button>
  <Grid container justifyContent="flex-end">
    <Grid item>
      <Link href="/" variant="body2">
        Already have an account? Sign in
      </Link>
    </Grid>
  </Grid>
</Box>

            </Box>
        </Container>
    );
};
export default RegisterPage;