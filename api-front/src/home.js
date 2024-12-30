import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Pagination, Container, Button, Dialog, DialogActions, DialogContent, DialogTitle 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  
  const navigate = useNavigate();

  // Fetch users from backend when the page or limit changes
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/users?page=${page}&limit=5`);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle Update button click
  const handleUpdate = (userId) => {
    navigate(`/update/${userId}`); // Navigate to the Update page with the user ID
  };

  // Handle Delete button click
  const handleDelete = (userId) => {
    setDeleteUserId(userId);
    setOpenDialog(true);
  };

  // Confirm and delete the user
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/users/${deleteUserId}`);
      setUsers(users.filter(user => user._id !== deleteUserId)); // Remove user from the current list
      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to delete user', error.response?.data || error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <h1>User Registration Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => handleUpdate(user._id)} 
                      color="primary" 
                      variant="contained" 
                      sx={{ marginRight: 2 }}
                    >
                      Update
                    </Button>
                    <Button 
                      onClick={() => handleDelete(user._id)} 
                      color="secondary" 
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2 }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>Do you want to delete this user?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;
