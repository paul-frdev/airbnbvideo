'use client';
import React from 'react';
import { Container } from '../Container';
import { CategoryBox } from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import { categories } from '@/app/constants';

export const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className='flex items-center justify-between overscroll-x-auto pt-4'>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            selected={category === item.label}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};
