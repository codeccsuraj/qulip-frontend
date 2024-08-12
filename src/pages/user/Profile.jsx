import React, { useEffect, useState } from "react";
import { useGigContext } from "../../context";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { getGigDataByUserId, deleteGigById } = useGigContext();
  const fetchAllUserData = async () => {
    const userId = JSON.parse(localStorage.getItem("user"));
    try {
      const result = await getGigDataByUserId(userId?.id);
      setData(result?.data);
    } catch (error) {
      console.error("error occured", error);
    }
  };



  useEffect(() => {
    fetchAllUserData();
  }, [data]);
  return (
    <>
      <div className="container-fluid">
        <div className="container-sm">
          <div className="row py-4">
            <div className="col-lg-3">
              <button className="d-flex outline-0 border-0 align-items-center p-2 gap-1 bg-primary-subtle fw-bold rounded-circle ">
                <span className="display-2 fw-bold">
                  {data?.user?.firstName[0]}
                </span>
                <span className="display-2 fw-bold">
                  {data?.user?.lastName[0]}
                </span>
              </button>
            </div>
            <div className="col-lg">
              <h2 className="text-primary"> {data?.user?.firstName} {data?.user?.lastName} </h2>
              <p className="card-text text-secondary">{data?.user?.email}</p>
              <p className="card-text text-secondary">{data?.user?.mobile}</p>
            </div>
          </div>
        </div>
        <div className="container-sm">
          <h3>My Posts - {data?.gigs?.length}</h3>
          <div className="row py-4">
            {data?.gigs?.map((gig, idx) => (
              <div key={idx} className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h2 className="fw-bold">{gig?.title}</h2>
                    <p className="text-primary card-text">{gig?.description.slice(0, 100)}</p>
                  </div>
                  <div className="card-footer d-flex align-items-center gap-2">
                    <button onClick={() => deleteGigById(gig?._id)} className="btn btn-outline-danger w-50">Delete</button>
                    <button onClick={() => navigate(`/edit-gig/${gig?._id}`)} className="btn btn-outline-secondary w-50">Update</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
