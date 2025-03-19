'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Clear session, remove tokens, etc.
    console.log('User logged out');
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
