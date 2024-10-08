import React, { useEffect, useState } from "react";
import TextInput from "../input/TextInput";
import { category } from "../../test/testData";
import { useParams } from "react-router-dom";
import { useGigContext } from "../../context";

const UpdateGig = () => {
  const { getGigById, updateGig } = useGigContext();
  const { id } = useParams();

  const [gigInfo, setGigInfo] = useState({
    title: "",
    description: "",
    category: "",
    userId: "",
  });

  const fetchGigData = async () => {
    try {
      const result = await getGigById(id);
      setGigInfo(result?.data)
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGigData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGigInfo({
      ...gigInfo,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    console.log(gigInfo);
    updateGig(gigInfo?._id, gigInfo);
  };
  return (
    <div className="container-fluid bg-light">
      <div className="row justify-content-center bg-secondary-subtle">
        <div className="col-lg-11 py-4">
          <h2 className="text-primary fw-bold">Update Post</h2>
        </div>
      </div>
      <div className="container-sm">
        <div className="row">
          <div className="col-lg-6 py-4">
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="title">
                Title
              </label>
              <TextInput
                type="text"
                value={gigInfo.title}
                onChange={handleInputChange}
                name="title"
                placeholder="Enter gig title"
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="category">
                Category
              </label>
              <select
                className="form-select"
                name="category"
                value={gigInfo.category}
                onChange={handleInputChange}
              >
                <option value="">Choose option</option>
                {category.map((item, idx) => (
                  <option key={idx} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                rows={4}
                className="form-control"
                name="description"
                value={gigInfo.description}
                onChange={handleInputChange}
                placeholder="Enter gig description"
              />
            </div>
            <div className="form-group mb-3">
              <button onClick={handleSubmit} className="btn btn-primary w-25">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateGig;
