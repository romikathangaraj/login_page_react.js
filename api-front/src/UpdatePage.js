import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';

const UpdatePage = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [user, setUser] = useState({ firstname: '', lastname: '', email: '' }); // State to hold user data
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/users/${userId}`);
        if (response.data) {
          setUser(response.data); // Populate the form with fetched data
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data.');
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchUser();
  }, [userId]);

  // Handle form submission for update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/auth/users/${userId}`, user); // Update the user
      alert('User updated successfully!');
      navigate('/home'); // Redirect to home after successful update
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user data.');
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <Container maxWidth="sm">
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={user.firstname}
          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={user.lastname}
          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" color="primary" variant="contained">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default UpdatePage;
