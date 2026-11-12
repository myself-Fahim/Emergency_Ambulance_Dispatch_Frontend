
import Register_Form from '@/components/form/register_form';
import React from 'react';

const RegisterPage = () => {
    return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 border">
      <div className="w-full max-w-sm md:max-w-4xl border">
        <Register_Form></Register_Form>
      </div>
    </div>
  )
};

export default RegisterPage;