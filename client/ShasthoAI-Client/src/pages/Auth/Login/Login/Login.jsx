import React from 'react';

import './Login.css';
import LoginBrandSection from '../LoginBrandSection/LoginBrandSection';
import LoginForm from '../LoginForm/LoginForm';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-grid">
        {/* Left Side - Branding & Features */}
        <LoginBrandSection />
        
        {/* Right Side - Login Form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;