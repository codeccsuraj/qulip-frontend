import React, { useState } from 'react';
import { TextInput } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context';

const Register = () => {
  const { signupHandler } = useAuthContext();
  const navigate = useNavigate();
  const [signupCredentials, setSignupCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupCredentials({
      ...signupCredentials,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const success = await signupHandler(signupCredentials);
    if (success) {
      navigate('/login'); // Redirect to login page upon successful signup
    }
  };

  return (
    <div className='container-fluid bg-secondary-subtle'>
      <div className='container-sm'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 py-4 bg-light my-4 rounded'>
            <h2 className='text-primary text-center'>Create a new account</h2>
            <div className='form-group mb-3'>
              <label className='form-label' htmlFor='firstName'>
                First Name
              </label>
              <TextInput
                type='text'
                value={signupCredentials.firstName}
                onChange={handleInputChange}
                name='firstName'
              />
            </div>
            <div className='form-group mb-3'>
              <label className='form-label' htmlFor='lastName'>
                Last Name
              </label>
              <TextInput
                type='text'
                value={signupCredentials.lastName}
                onChange={handleInputChange}
                name='lastName'
              />
            </div>
            <div className='form-group mb-3'>
              <label className='form-label' htmlFor='mobile'>
                Mobile
              </label>
              <TextInput
                type='text'
                value={signupCredentials.mobile}
                onChange={handleInputChange}
                name='mobile'
              />
            </div>
            <div className='form-group mb-3'>
              <label className='form-label' htmlFor='email'>
                Email
              </label>
              <TextInput
                type='email'
                value={signupCredentials.email}
                onChange={handleInputChange}
                name='email'
              />
            </div>
            <div className='form-group mb-3'>
              <label className='form-label' htmlFor='password'>
                Password
              </label>
              <TextInput
                type='password'
                value={signupCredentials.password}
                onChange={handleInputChange}
                name='password'
              />
            </div>
            <div className='form-group mb-3'>
              <button className='btn btn-outline-primary w-25' onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
            <div className='form-group mb-3'>
              <p className='d-flex align-items-center gap-2'>
                Already a user?{' '}
                <Link to='/login' className='nav-link text-primary'>
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
