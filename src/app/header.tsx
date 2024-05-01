'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Header = () => {
    const session = useSession();   // checking someone is logged in using useSession

  return (
    <div className="">
        { session.data ? <Button onClick={()=> signOut()}> Sign Out </Button> : <Button onClick={()=> signIn('google')}> Sign In </Button> }
        <ModeToggle />
  </div>
  )
}

export default Header