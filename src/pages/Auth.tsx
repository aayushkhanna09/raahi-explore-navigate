
import React from 'react';
import Layout from '@/components/layout/Layout';
import AuthForm from '@/components/auth/AuthForm';
import RaahiLogo from '@/components/ui/RaahiLogo';

const Auth: React.FC = () => {
  return (
    <Layout hideNavigation>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-primary/10 to-primary/5">
        <div className="mb-8">
          <RaahiLogo size="lg" colorTheme="dark" />
        </div>
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <AuthForm />
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
