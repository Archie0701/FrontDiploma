import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAccessToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const deleteAccessToken = async () => {
      try {
        // Delete access token from local storage
        localStorage.removeItem('accessToken');
        // Redirect to a specific page, for example, the homepage
        navigate('/login');
      } catch (error) {
        console.error('Error deleting access token:', error);
      }
    };

    deleteAccessToken();
  }, [navigate]);

  return null; // or you can render a loading spinner or a message if needed
};

export default DeleteAccessToken;