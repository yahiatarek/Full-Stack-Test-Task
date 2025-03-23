import { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  let token = null; 

  if (typeof window !== 'undefined') {token = sessionStorage.getItem('token');}

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
