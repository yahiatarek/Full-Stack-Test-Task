'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';
import { getUserData } from './apis/auth';

export default function DashboardPage() {
  const router = useRouter();
  const { setToken, token, setData, data } = useUserStore();

  const fetchUserData = useCallback(
    async (token: string) => {
      try {
        const data = await getUserData(token); // This calls the exported function.
        setData(data as unknown as string);
      } catch (err: any) {
        console.error('getting data failed:', err);
      }
    },
    [setData]
  );

  useEffect(() => {
    fetchUserData(token);
  }, []);

  const handleLogout = () => {
    setToken('');
    setData('');
    router.push('/signin');
  };

  return (
    <div className="container">
      <h1>{data}</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
