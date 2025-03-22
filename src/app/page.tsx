'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';
import { getUserData } from './apis/auth';
import AuthGuard from './guards/AuthGuard';

export default function DashboardPage() {
  const router = useRouter();
  const { setData, data } = useUserStore();
  const token = sessionStorage.getItem('token');

  const fetchUserData = useCallback(
    async (token: string) => {
      try {
        const data = await getUserData(token);
        setData(data as unknown as string);
      } catch (err: any) {
        console.error('getting data failed:', err);
      }
    },
    [setData]
  );

  useEffect(() => {
    if (token) fetchUserData(token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setData('');
    router.push('/signin');
  };

  return (
    <AuthGuard>
      <div className="container">
        <h1>User data: {data}</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </AuthGuard>
  );
}
