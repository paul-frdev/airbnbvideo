'use client';
import useSearchModal from '@/app/hooks/useSearchModal';
import React, { useCallback, useMemo, useState } from 'react';
import { Modal } from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import { CountrySelect, SelectCountryValue } from '../inputs/CountrySelect';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import { Heading } from '../Heading';
import { Calendar } from '../Calendar';
import { Counter } from '../inputs/Counter';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
export const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<SelectCountryValue>();
  const [step, setStep] = useState<STEPS>(STEPS.LOCATION);
  const [guestsCount, setGuessCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map: any = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    []
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
      console.log('currentQuery', currentQuery);
    }

    const updatedQuery = {
      ...currentQuery,
      locationValue: location?.value,
      guestsCount,
      roomCount,
      bathroomCount,
      startDate: '',
      endDate: '',
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestsCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        center
        title='Where do you want to go?'
        subtitle='find the perfect location'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as SelectCountryValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='More information' subtitle='Find your perfect place!' />
        <Counter
          title='Guests'
          subtitle='How many guests are coming?'
          onChange={(value) => setGuessCount(value)}
          value={guestsCount}
        />
        <hr />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you need?'
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
        />
        <hr />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you need'
          onChange={(value) => setBathroomCount(value)}
          value={bathroomCount}
        />
      </div>
    );
  }
  return (
    <Modal
      body={bodyContent}
      isOpen={searchModal.isOpen}
      actionLabel={actionLabel}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      title='Filters'
    />
  );
};
