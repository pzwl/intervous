import React from 'react'
import { SignedIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { SignedOut } from '@clerk/clerk-react';
import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import { useUser } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import DashBoardPage from './pages/DashboardPage.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
function App() {


  const { isSignedIn, isLoaded } = useUser();

  // to fix the flickering issue 
  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashBoardPage /> : <Navigate to="/" />} />
        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster />

    </>
  )
}

export default App  
