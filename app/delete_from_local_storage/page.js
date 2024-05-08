'use client';
import React, { useEffect } from "react";



function ConfirmEmail() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
        localStorage.removeItem('userRole');
        localStorage.removeItem('accessToken');
            }
      }, []);
    
  return (
    <>Hello</>
  );
}

export default ConfirmEmail;