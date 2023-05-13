'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { Modal } from './Modal';
import { Heading } from '../Heading';
import { Input } from '../inputs/Input';
import { Button } from '../Button';
import useLoginModal from '@/app/hooks/useLogInModal';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    void signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const handleChangeModal = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='login to your account!' center />
      <Input
        id='email'
        register={register}
        label='Email'
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
      <Button
        onClick={() => signIn('google')}
        outline
        label='Continue with Google'
        icon={FcGoogle}
      />
      <Button
        onClick={() => signIn('github')}
        outline
        label='Continue with GitHub'
        icon={AiFillGithub}
      />
      <div className='mb-2 mt-4 text-center font-light text-neutral-500'>
        <div className='flex items-center justify-center gap-2'>
          <div>dont have an account?</div>
          <div
            onClick={handleChangeModal}
            className='cursor-pointer text-neutral-800 hover:underline'
          >
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
