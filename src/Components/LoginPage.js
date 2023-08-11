import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Here, you can implement your actual signup logic
    // For demonstration purposes, let's just log the form data
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Mobile:', mobile);
    console.log('Password:', password);

    // You can clear the input fields after signup attempt if needed
    setUsername('');
    setEmail('');
    setMobile('');
    setPassword('');
  };

  const toggleSignupMode = () => {
    setSigningUp(!signingUp);
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='rounded p-4 col-lg-6 bg-light'>
        <h2 className="mb-4">{signingUp ? 'Sign Up for WhizChat' : 'Welcome to WhizChat'}</h2>
        <form onSubmit={handleFormSubmit}>
          {signingUp && (
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          )}
          {signingUp && (
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                id="mobile"
                value={mobile}
                onChange={handleMobileChange}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="container text-center">
            <button type="submit" className="w-100 btn btn-primary mb-3">
              {signingUp ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-muted text-center">Or</p>
        <div className="container text-center">
          <button className="btn btn-outline-primary">Login with Face Recognition</button>
        </div>
        <p className="mt-3 text-center">
          {signingUp ? 'Already have an account?' : "Don't have an account?"}
          <button className="btn btn-link" onClick={toggleSignupMode}>
            {signingUp ? 'Login here' : 'Sign up now'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
