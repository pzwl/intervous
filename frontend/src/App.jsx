import React from 'react'
import { SignedIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { SignedOut } from '@clerk/clerk-react';
import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import { useUser } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
function App() {


  const {isSignedIn} = useUser();

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/problems" element={isSignedIn?<ProblemsPage />:<Navigate to={"/"} />} />
    </Routes>

    <Toaster />

    </>
    )
}

export default App
