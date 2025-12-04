import React from 'react'
import { SignedIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { SignedOut } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
function HomePage() {
  return (

    <>

        <button onClick = {()=>{toast.success("Hello")}}>Click me</button>

        <h1>Welcome to Intervous</h1>
        <SignedOut>
            <SignInButton mode="modal" />
        </SignedOut>

        <SignedIn>
            <p>You are signed in!</p>
            <SignOutButton />
        </SignedIn>

        <UserButton />
    </>
    
  )
}

export default HomePage