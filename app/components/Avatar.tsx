"use client"
import Image from 'next/image'
import React from 'react'
import AvatarImage from "../../public/images/avatar.jpeg"

export const Avatar = () => {
  return (
    <Image src={AvatarImage} className='rounded-full' height={30} width={30} alt='Avatar' />
  )
}
