import { createContext, useState } from "react";
import { LOGIN_URL, SIGNUP_URL } from "../../api/endpoints";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const loginHandler = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        toast.error('Invalid credentials');
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      localStorage.setItem('token', result?.userToken);
      localStorage.setItem('user', JSON.stringify(result?.user));
      setToken(result?.userToken)
      // Handle successful login, e.g., save token, redirect, etc.
      console.log('Login successful:', result);
      toast.success(result?.message);

      if (result?.message && result.message.includes("Login successful")) {
        window.location.href = "/";
      }

    } catch (error) {
      console.error('Error during login:', error);
      if (error.message !== 'Unauthorized') {
        toast.error(error?.message || 'An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  const signupHandler = async (data) => {
    try {
      const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData?.message || 'Signup failed');
        throw new Error(errorData?.message || 'Signup failed');
      }

      const result = await response.json();

      if (result?.message && result.message.includes("User registered successfully")) {
        window.location.href = "/login";
      }
      // Handle successful signup, e.g., redirect to login page
      console.log('Signup successful:', result);
      toast.success(result?.message || 'Signup successful');

    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(error?.message || 'An error occurred during signup');
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    setToken(null);
    toast.success("Logged out successfully!!");
  };

  return (
    <AuthContext.Provider value={{ loginHandler, token, signupHandler, logoutHandler}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;