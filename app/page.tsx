'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation'


function Page() {
  useEffect(() => {
      redirect('/login');
  }, []);
  return null;
}

export default Page;
