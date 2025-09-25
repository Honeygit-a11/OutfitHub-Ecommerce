import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/Authcontext'
import { Navigate, useNavigate } from 'react-router-dom';
// import { Children } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.isAdmin === false) {
      return navigate('/')
    }
  }, [user, navigate])

  if (!user || user.isAdmin === false) {
    return null;
  }

  return children;
}

export default ProtectedRoute
