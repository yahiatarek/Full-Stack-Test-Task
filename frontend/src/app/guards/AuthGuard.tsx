import { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = sessionStorage.getItem('token');

  useLayoutEffect(() => {
    if (!token) {
      router.push('/signin');
    }
  }, [router, token]);

  if (!token) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
