
import { LoginForm } from '@/components/form/login_form';
import React from 'react';

const LoginPage = () => {
    return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 border">
      <div className="w-full max-w-sm md:max-w-4xl border">
        <LoginForm></LoginForm>
      </div>
    </div>
  )
};

export default LoginPage;