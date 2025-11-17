import React from 'react'
import { SignedIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { SignedOut } from '@clerk/clerk-react';

function App() {

  return (
    <>
      <h1>Welcome to Intervous</h1>
      <SignedOut>
        <SignInButton mode='Modal'/>
      </SignedOut>

      <SignedIn>
        <p>You are signed in!</p>
        <SignOutButton />
      </SignedIn>

      <UserButton />
    </>
  )
}

export default App
