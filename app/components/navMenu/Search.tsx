'use client';
import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

export const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestsCount = params?.get('guestsCount');

  console.log('guestsCount', guestsCount);

  return (
    <div
      onClick={searchModal.onOpen}
      className='w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto'
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='px-6 text-sm font-semibold'>
          {locationValue || 'anywhere'}
        </div>
        <div className='hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block'>
          {startDate && endDate}
        </div>
        <div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
          <div className='hidden sm:block'>{guestsCount || 'Add quests'}</div>
          <div className='rounded-full bg-rose-500 p-2 text-white'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
