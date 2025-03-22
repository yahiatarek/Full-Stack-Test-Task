import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token } = useUserStore();
  const isAuthenticated = !!token;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
