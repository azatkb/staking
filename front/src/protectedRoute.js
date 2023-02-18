import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { isAutorized, getRole } from './auth';

let adminPages = [
  "users",
  "transaction",
  "user",
  "purchases",
  "tickets",
  "histiry2",
  "chart",
];

export const ProtectedRoute = ({ children, path }) => {

  let auth = isAutorized();
  let role = getRole();
  
  if(adminPages.includes(path) && role !== "admin"){
    return <Navigate to="/swap" />;
  }

  if (!auth) {
    return <Navigate to="/" />;
  }
  return children;
};


  