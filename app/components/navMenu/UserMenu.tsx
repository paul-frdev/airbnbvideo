'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar } from '../Avatar';
import { MenuItem } from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLogInModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
export const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
            <Avatar scr={currentUser?.image} />
          </div>
        </div>
      </div>
      <div
        ref={modalRef}
        style={{
          visibility: !isOpen ? 'hidden' : 'visible',
          opacity: !isOpen ? '0' : '1',
          transition: 'opacity .3s',
        }}
        className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4'
      >
        <div className='flex cursor-pointer flex-col'>
          {currentUser ? (
            <>
              <MenuItem onClick={() => {}} label='My trips' />
              <MenuItem onClick={() => {}} label='My favorites' />
              <MenuItem onClick={() => {}} label='My reservations' />
              <MenuItem onClick={() => {}} label='My properties' />
              <MenuItem onClick={() => {}} label='Airbnb my home' />
              <hr />
              <MenuItem onClick={() => signOut()} label='logout' />
            </>
          ) : (
            <>
              <MenuItem onClick={loginModal.onOpen} label='Login' />
              <MenuItem onClick={registerModal.onOpen} label='Sign Up' />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
