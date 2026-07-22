import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

const LoginPage = () => {
  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">Login</h1>
        <p className="text-muted-foreground mt-2">Welcome Back!</p>
      </div>
      <LoginForm />
    </div>
  </div>
  )
}

export default LoginPage