'use client';
import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar } from '../Avatar';
import { MenuItem } from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';

export const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden cursor-pointer rounded-full px-3 py-4 text-sm font-semibold transition hover:bg-neutral-100 md:block'
          onClick={() => {}}
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1'
        >
          <AiOutlineMenu size={18} />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      <div
        style={{
          visibility: !isOpen ? 'hidden' : 'visible',
          opacity: !isOpen ? '0' : '1',
          transition: 'opacity .3s',
        }}
        className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4'
      >
        <div className='flex cursor-pointer flex-col'>
          <>
            <MenuItem onClick={() => {}} label='Login' />
            <MenuItem onClick={registerModal.onOpen} label='Sign Up' />
          </>
        </div>
      </div>
    </div>
  );
};
