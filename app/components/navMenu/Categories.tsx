'use client';
import React from 'react';
import { Container } from '../Container';
import { TbBeach } from 'react-icons/tb';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { CategoryBox } from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'this property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'this property has windmills',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'this property is modern',
  },
];

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
