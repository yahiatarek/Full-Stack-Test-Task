'use client';

import React from 'react';
import AuthGuard from './guards/AuthGuard';

interface IRoot {
  children: React.ReactNode;
}

const Root = ({ children }: IRoot) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default Root;
