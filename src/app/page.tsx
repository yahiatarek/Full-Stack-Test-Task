'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      router.push('signin');
    }
  }, [token, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    router.push('/signin');
  };

  return (
    <div className="container">
      <h1>Welcome to the application.</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
