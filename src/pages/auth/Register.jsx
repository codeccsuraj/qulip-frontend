import React, { useState } from "react";
import { TextInput } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import Multiselect from 'multiselect-react-dropdown';

const Register = () => {
  const { signupHandler } = useAuthContext();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [signupCredentials, setSignupCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    role: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupCredentials({
      ...signupCredentials,
      [name]: value,
    });
  };

  const handleRoleSelect = (selectedList) => {
    // Assuming singleSelect is true, selectedList will have one item if selected
    setSignupCredentials({
      ...signupCredentials,
      role: selectedList.length > 0 ? selectedList[0].name : '',
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    console.log(signupCredentials);
    const success = await signupHandler(signupCredentials);
    if (success) {
      navigate("/login"); // Redirect to login page upon successful signup
    }
  };

  return (
    <div className="container-fluid">
      <div className="container-sm">
        <div className="row py-4">
          <div className="col-lg-6">
            <div>
              <img
                src="https://shorturl.at/FOCYp"
                className="img-fluid"
                alt="Signup Banner"
              />
            </div>
          </div>
          <div className="col-lg-4">
            <h2 className="text-primary mb-3">Create a new account</h2>
            {step === 1 && (
              <FormStepOne
                nextStep={nextStep}
                values={signupCredentials}
                handleInputChange={handleInputChange}
                handleRoleSelect={handleRoleSelect}
              />
            )}
            {step === 2 && (
              <FormStepTwo
                prevStep={prevStep}
                values={signupCredentials}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            )}
            <div className="form-group mb-3">
              <p className="d-flex align-items-center gap-2">
                Already a user?{" "}
                <Link to="/login" className="nav-link text-primary">
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

const FormStepOne = ({ nextStep, values, handleInputChange, handleRoleSelect }) => {
  const options = [{ name: 'Jobs', id: 1 }, { name: 'Employees', id: 2 }];
  return (
    <>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="role">
          What are you looking for?
        </label>
        <Multiselect
          options={options}
          singleSelect={true}
          placeholder="What are you looking for"
          displayValue="name"
          onSelect={handleRoleSelect}
          onRemove={() => handleRoleSelect([])}
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="firstName">
          First Name
        </label>
        <TextInput
          type="text"
          value={values.firstName}
          onChange={handleInputChange}
          name="firstName"
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="lastName">
          Last Name
        </label>
        <TextInput
          type="text"
          value={values.lastName}
          onChange={handleInputChange}
          name="lastName"
        />
      </div>
      <div className="form-group mb-3">
        <button className="btn btn-primary w-25" onClick={nextStep}>
          Next
        </button>
      </div>
    </>
  );
};

const FormStepTwo = ({ prevStep, values, handleInputChange, handleSubmit }) => {
  return (
    <>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="mobile">
          Mobile
        </label>
        <TextInput
          type="text"
          value={values.mobile}
          onChange={handleInputChange}
          name="mobile"
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <TextInput
          type="email"
          value={values.email}
          onChange={handleInputChange}
          name="email"
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <TextInput
          type="password"
          value={values.password}
          onChange={handleInputChange}
          name="password"
        />
      </div>
      <div className="form-group mb-3 d-flex gap-2">
        <button className="btn btn-secondary w-25" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary w-25" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </>
  );
};

export default Register;
