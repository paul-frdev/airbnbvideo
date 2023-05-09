'use client'
import React, { useCallback, useEffect, useState } from 'react'


interface ModalProps {
  isOpen?: boolean;
  disabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  title?: string;
  actionLabel: string;
  secondaryLabel?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}
export const Modal: React.FC<ModalProps> = ({ onClose, onSubmit, secondaryAction, isOpen, disabled, title, actionLabel, secondaryLabel, body, footer }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose()
    }, 300);

  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
    <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
      <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
        {/* Content */}
        
      </div>
    </div>
    </>
  )
}
