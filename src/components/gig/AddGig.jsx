import React, { useState } from "react";
import TextInput from "../input/TextInput";
import { category } from "../../test/testData";
import { useGigContext } from "../../context";
import { useParams } from "react-router-dom";
import UpdateGig from "./UpdateGig";
import Multiselect from 'multiselect-react-dropdown';
import { jobType } from '../../test/testData.js'
const AddGig = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { addGig } = useGigContext();
  const [step, setStep] = useState(1);
  const { id } = useParams();

  const [gigInfo, setGigInfo] = useState({
    title: "",
    description: "",
    category: "",
    userId: user?.id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGigInfo({
      ...gigInfo,
      [name]: value,
    });
  };

  const handleCategoryChange = (selectedList) => {
    setGigInfo({
      ...gigInfo,
      category: selectedList.length ? selectedList[0].title : ""
    });
  };

  const handleSubmit = () => {
    console.log(gigInfo);
    // addGig(gigInfo); // Uncomment this when you're ready to add the gig
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return !id ? (
    <div className="container-fluid bg-light">
      <div className="row justify-content-center bg-secondary-subtle">
        <div className="col-lg-11 py-2">
          <h4 className="text-primary fw-bold">Add a job</h4>
        </div>
      </div>
      <div className="container-sm">
        <div className="row">
          <FormStepOne
            nextStep={nextStep}
            values={gigInfo}
            handleInputChange={handleInputChange}
            handleCategoryChange={handleCategoryChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  ) : (
    <UpdateGig />
  );
};

const FormStepOne = ({ nextStep, values, handleInputChange, handleCategoryChange, handleSubmit }) => {
  return (
    <div className="col-lg-6 py-4">
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <TextInput
          type="text"
          value={values.title}
          onChange={handleInputChange}
          name="title"
          placeholder="Enter gig title"
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="category">
          Category
        </label>
        <Multiselect
          options={category} // The options for Multiselect
          singleSelect={true} // To allow single selection
          displayValue="title" // The key to display in the dropdown
          onSelect={handleCategoryChange} // Callback when an item is selected
          onRemove={handleCategoryChange} // Callback when an item is removed
          placeholder="Select category"
          selectedValues={values.category ? [{ title: values.category }] : []} // Preselect category if it exists
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="category">
          Job type
        </label>
        <Multiselect
          options={jobType} // The options for Multiselect
          singleSelect={true} // To allow single selection
          displayValue="name" // The key to display in the dropdown
          onSelect={handleCategoryChange} // Callback when an item is selected
          onRemove={handleCategoryChange} // Callback when an item is removed
          placeholder="Select job type"
          selectedValues={values.category ? [{ title: values.category }] : []} // Preselect category if it exists
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="category">
          Salary range
        </label>
        <Multiselect
          options={jobType} // The options for Multiselect
          singleSelect={true} // To allow single selection
          displayValue="name" // The key to display in the dropdown
          onSelect={handleCategoryChange} // Callback when an item is selected
          onRemove={handleCategoryChange} // Callback when an item is removed
          placeholder="Select job type"
          selectedValues={values.category ? [{ title: values.category }] : []} // Preselect category if it exists
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          rows={4}
          className="form-control"
          name="description"
          value={values.description}
          onChange={handleInputChange}
          placeholder="Enter gig description"
        />
      </div>
      <div className="form-group mb-3">
        <button onClick={handleSubmit} className="btn btn-primary w-25">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddGig;
