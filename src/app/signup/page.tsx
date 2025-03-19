'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
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

  const onSubmit = (data: SignupFormValues) => {
    console.log('Sign Up Data:', data);
    // TODO: Call your sign-up API endpoint here.
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link href="/signin">
          <span className="link">Sign In</span>
        </Link>
      </p>
    </div>
  );
}
