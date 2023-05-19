'use client';
import React, { FC } from 'react';
import { Range } from 'react-date-range';
import { Calendar } from '../Calendar';
import { Button } from '../Button';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}
export const ListingReservation: FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className='overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white'>
      <div className='flex items-center gap-1 p-4'>
        <p className='text-2xl font-semibold'>$ {price}</p>
        <p className='font-light text-neutral-600'>night</p>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className='p-4'>
        <Button disabled={disabled} label='Reserve' onClick={onSubmit} />
      </div>
      <div className='flex items-center justify-between p-4 text-lg font-semibold'>
        <p>Total</p>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
};
