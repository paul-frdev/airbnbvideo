'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { Modal } from './Modal';
import { Heading } from '../Heading';
import { Input } from '../inputs/Input';
import { Button } from '../Button';

export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // axios.post('/api/register', data)
    //   .then(() => {
    //     registerModal.onClose()
    //   }).catch((error) => {
    //     console.log(error);

    //   }).finally(() => {
    //     setIsLoading(false)
    //   })
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create an account!' center />
      <Input
        id='email'
        register={register}
        label='Email'
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id='name'
        register={register}
        label='Name'
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id='password'
        register={register}
        label='Password'
        disabled={isLoading}
        errors={errors}
        required
        type='password'
      />
    </div>
  );

  const footerContent = (
    <div className='mt-3 flex flex-col gap-4'>
      <hr />
      <Button outline label='Continue with Google' icon={FcGoogle} />
      <Button outline label='Continue with GitHub' icon={AiFillGithub} />
      <div className='mb-2 mt-4 text-center font-light text-neutral-500'>
        <div className='flex items-center justify-center gap-2'>
          <div> Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className='cursor-pointer text-neutral-800 hover:underline'
          >
            log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
