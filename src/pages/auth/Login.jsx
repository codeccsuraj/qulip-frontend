import React, { useEffect, useState } from 'react'
import { TextInput } from '../../components'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useAuthContext } from '../../context';

const Login = () => {
  const { loginHandler, token, loading} = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginCredentials, setLoginCredentials] = useState({
    email : '',
    password : ''
  });

  useEffect(() => {
    let id;
    if (token) {
      id = setTimeout(() => {
        navigate(location?.state?.from?.pathname ?? "/");
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [token]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setLoginCredentials({
      ...loginCredentials,
      [name] : value,
    })
  };

  const handleSubmit = () => {
    console.log(loginCredentials);
    loginHandler(loginCredentials)
  }


  return (
    <div className='container-fluid bg-secondary'>
      <div className="container-sm">
        <div className="row justify-content-center min-h-100 align-items-center">
          <div className="col-lg-6 py-4 my-4 bg-light rounded">
            <h2 className='text-primary text-center'>Login here</h2>
            <div className="form-group mb-3">
              <label className='form-label' htmlFor="email">Email</label>
              <TextInput type='email' value={loginCredentials.email} onChange={handleInputChange} name='email' />
            </div>
            <div className="form-group mb-3">
              <label className='form-label' htmlFor="password">Password</label>
              <TextInput type='password' value={loginCredentials.password} onChange={handleInputChange} name='password' />
            </div>
            <div className="form-group mb-3">
              <button className='btn btn-outline-primary w-25' onClick={handleSubmit}>Login</button>
            </div>
            <div className="form-group mb-3">
              <p className='d-flex align-items-center gap-2'>Not a user ? <Link to='/register' className='nav-link text-primary'>create an account</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login