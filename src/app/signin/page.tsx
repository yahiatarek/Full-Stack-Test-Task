'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { signin } from '../apis/auth';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';

const signinSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type SigninFormValues = z.infer<typeof signinSchema>;

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
  });

  const router = useRouter();
  const { setToken } = useUserStore();

  const onSubmit = async (data: SigninFormValues) => {
    try {
      const res = await signin({ email: data.email, password: data.password });
      if (res.status === 200 && res.accessKey) {
        router.push('/');
        setToken(res.accessKey);
      }
      setError('');
    } catch (err: any) {
      console.error('Signin failed:', err);
      setError(err?.message || 'An error occurred');
    }
  };

  const [error, setError] = useState<string>('');

  return (
    <div className="container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input id="email" type="email" className="input" {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input id="password" type="password" className="input" {...register('password')} />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don&apos;t have an account?{' '}
        <Link href="/signup">
          <span className="link">Sign Up</span>
        </Link>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
