'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { signup } from '../apis/auth';
import { useRouter } from 'next/navigation';

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  data: z.string().min(20, { message: 'Add something to describe the user' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Za-z]/, { message: 'Must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Must contain at least one number' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Must contain at least one special character',
    }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const [error, setError] = useState<string>('');
  const router = useRouter();

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup({ email: data.email, password: data.password, name: data.name, data: data.data });
      router.push('/');
      setError('');
    } catch (err: any) {
      console.error('Signup failed:', err);
      setError(err?.message || 'An error occurred');
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input id="email" type="email" className="input" {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input id="name" type="text" className="input" {...register('name')} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input id="password" type="password" className="input" {...register('password')} />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label">
            Description:
          </label>
          <textarea id="description" className="text-area" {...register('data')} />
          {errors.data && <p className="error">{errors.data.message}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link href="/signin">
          <span className="link">Sign In</span>
        </Link>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
