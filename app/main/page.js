// pages/main.js
'use client';
import React, { useState, useEffect } from 'react';
import MainPage from '../components/mainPage';
import ProposerMainPage from '../components/proposerMainPageComponent';
import { redirect } from 'next/navigation';


const Main = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      if (typeof window !== 'undefined') {
      const storedUserRole = localStorage.getItem('userRole');
      if (storedUserRole) {
        setUserRole(storedUserRole);
      }
    }
    }, []);
    const [accessToken, setAccessToken] = useState(null);

    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('accessToken'));
    }
  return (
    <>
      {!accessToken ? (
    userRole === 'proposer' ? (
        <ProposerMainPage />
    ) : (
        <MainPage />
    )
    ) : (
        redirect('/login')
    )}
    </>
  );
};

export default Main;
