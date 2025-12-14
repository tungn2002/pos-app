import React from 'react';
import { Helmet } from 'react-helmet';

const AuthLayout = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{title} - POS App</title>
        <meta name="description" content="Secure login to your POS application. Manage your business efficiently with our point of sale system." />
        <meta name="keywords" content="POS, login, register, business, management, point of sale" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {children}
    </>
  );
};

export default AuthLayout;