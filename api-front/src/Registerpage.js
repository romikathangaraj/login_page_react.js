import { Box, Grid } from "@mui/system";
import React,{useState} from 'react';
import{
    Button,
    Typography,
    Container,
    TextField,
    Link

} from '@mui/material';


const RegisterPage = () => {
    const[formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password:''

    });
    const [errors,setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password:''
      });
    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;
        if (!formData.firstName) {
            tempErrors.firstName = 'firstname is required';
            isValid = false;
          }
        if(!formData.lastName){
            tempErrors.lastName='last name is required';
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
      const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm())
        {
            console.log('Form submitted successfully:',formData);
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
                <Box component = "form" onSubmit = {handleSubmit} sx={{mt:3}}>
                    <Grid container spacing = {2}>
                        <Grid item xs = {12} sm ={6}>
                            <TextField 
                            required 
                            fullwidth
                            id = "firstName"
                            label = "First Name"
                            name = "firstName"
                            value = {formData.firstName}
                            onChange = {handleChange}
                            sx={{ width: '400px', mb: 2 }}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12}sm={6}>
                        <TextField 
                            required 
                            fullwidth
                            id = "lastName"
                            label = "Last Name"
                            name = "lastName"
                            value = {formData.lastName}
                            onChange = {handleChange}
                            sx={{ width: '400px', mb: 2 }}
                            error={!!errors.lastName}
                            helperText={errors.lastName} 
                            />

                        </Grid>
                        <Grid item xs={12}sm={6}>
                        <TextField 
                            required 
                            fullwidth
                            id = "email"
                            label = "Email Address"
                            name = "email"
                            value = {formData.email}
                            onChange = {handleChange}
                            sx={{ width: '400px', mb: 2 }}
                            error={!!errors.email}
                            helperText={errors.email}
                            
                            />

                        </Grid>
                        <Grid item xs={12}sm={6}>
                        <TextField 
                            required 
                            fullwidth
                            id = "password"
                            label = "password"
                            name = "password"
                            type = "password"
                            value = {formData.password}
                            onChange = {handleChange}
                            sx={{ width: '400px', mb: 2 }} 
                            error={!!errors.password}
                            helperText={errors.password}
                            />

                        </Grid>
                    </Grid>
                    <Button type = "submit"
                    fullwidth
                    variant = "contained"
                    sx={{ width: '400px', mb: 2 }}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent = "flex-end">
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