'use client';

import React from 'react';

interface IRoot {
  children: React.ReactNode;
  lng: string;
}

const Root = ({ children }: IRoot) => {
  return <>{children}</>;
};

export default Root;
