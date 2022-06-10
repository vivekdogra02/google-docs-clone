import { LoginIcon } from '@heroicons/react/outline'
import { useSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

function Login() {
    const {data: session} = useSession()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <Image 
            src='https://links.papareact.com/1ui'
            height="300"
            width="550"
            objectFit='contain'
        />
        <LoginIcon className='h-10 w-44 text-blue-500' onClick={signIn}/>
    </div>
  )
}

export default Login