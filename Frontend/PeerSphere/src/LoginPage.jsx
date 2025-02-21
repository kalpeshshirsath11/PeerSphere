import React, { useState } from 'react';

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const containerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '50px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Enhanced shadow
    '@media (max-width: 600px)': {
      maxWidth: '90%', // Reduce width on smaller screens
      margin: '20px auto',
    },
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
    '@media (max-width: 600px)': {
      flexDirection: 'column', // Stack buttons on smaller screens
      alignItems: 'center',
      gap: '10px',
    },
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Button shadow
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out', // Smooth transition
    ':hover': {
      backgroundColor: '#0056b3',
      transform: 'translateY(-3px)', // More pronounced lift on hover
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.25)', // Enhanced shadow on hover
    },
    ':disabled': {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
      boxShadow: 'none', // Remove shadow when disabled
      transform: 'none',
    },
    '@media (max-width: 600px)': {
      fontSize: '14px', // Smaller font size on smaller screens
      padding: '8px 16px',
    },
  };

  return (
    <div style={containerStyle}>
      <div style={buttonContainerStyle}>
        <button
          onClick={handleSignInClick}
          disabled={!isSignUp}
          style={{
            ...buttonStyle,
            backgroundColor: !isSignUp ? '#007bff' : '#ccc',
            cursor: !isSignUp ? 'pointer' : 'not-allowed',
          }}
        >
          Sign In
        </button>
        <button
          onClick={handleSignUpClick}
          disabled={isSignUp}
          style={{
            ...buttonStyle,
            backgroundColor: isSignUp ? '#007bff' : '#ccc',
            cursor: isSignUp ? 'pointer' : 'not-allowed',
          }}
        >
          Sign Up
        </button>
      </div>

      {isSignUp ? (
        <SignUpForm />
      ) : (
        <SignInForm />
      )}
    </div>
  );
}

function SignInForm() {
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center', // Center items horizontally
  };

  const labelStyle = {
    fontSize: '16px',
    marginBottom: '5px',
    textAlign: 'center', // Center the text
    width: '100%', // Ensure label takes full width
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%', // Ensure input takes full width
    textAlign: 'center', // Center the text
  };

  const submitButtonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: '16px',
    width: '100%',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
    ':hover': {
      backgroundColor: '#1e7e34',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Sign In</h2>
      <form style={formStyle}>
        <label style={labelStyle}>
          Email:
          <input type="email" name="email" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Password:
          <input type="password" name="password" style={inputStyle} />
        </label>
        <button type="submit" style={submitButtonStyle}>Sign In</button>
      </form>
    </div>
  );
}

function SignUpForm() {
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center', // Center items horizontally
  };

  const labelStyle = {
    fontSize: '16px',
    marginBottom: '5px',
    textAlign: 'center', // Center the text
    width: '100%', // Ensure label takes full width
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%', // Ensure input takes full width
    textAlign: 'center', // Center the text
  };

  const submitButtonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: '16px',
    width: '100%',
    marginTop: '10px',
     transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
    ':hover': {
      backgroundColor: '#1e7e34',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
      <form style={formStyle}>
        <label style={labelStyle}>
          Name:
          <input type="text" name="name" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Gender:
          <input type="text" name="gender" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Age:
          <input type="number" name="age" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          College ID:
          <input type="text" name="collegeId" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Email:
          <input type="email" name="email" style={inputStyle} />
        </label>
        <button type="submit" style={submitButtonStyle}>Sign Up</button>
        <button style={submitButtonStyle}>Sign Up with Google</button>
      </form>
    </div>
  );
}

export default LoginPage;
