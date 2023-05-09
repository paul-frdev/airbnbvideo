'use client';
import React, { useCallback, useEffect, useState } from 'react';

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
export const Modal: React.FC<ModalProps> = ({
  onClose,
  onSubmit,
  secondaryAction,
  isOpen,
  disabled,
  title,
  actionLabel,
  secondaryLabel,
  body,
  footer,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose();
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
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none'>
        <div className='relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5'>
          {/* Content */}
        </div>
      </div>
    </>
  );
};
