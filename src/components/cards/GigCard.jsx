import React from "react";
import { FaEye, FaShare, FaComment   } from "react-icons/fa";
import { BiLike } from "react-icons/bi";

const GigCard = ({ cardData }) => {
  return (
    <>
      {cardData?.map((gig, idx) => (
        <div key={idx} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{gig?.title}</h5>
            <p className="card-text">{gig?.description.slice(0, 350)}</p>
          </div>
          <div className="card-footer">
            <div className="row align-items-center">
              <div className="col-lg-1">
                <button className="d-flex align-items-center gap-1 btn bg-success-subtle fw-bold rounded-circle ">
                  <span>{gig?.userId?.firstName[0]}</span>
                  <span>{gig?.userId?.lastName[0]}</span>
                </button>
              </div>
              <div className="col-lg">
                <h6 className="d-flex align-items-center gap-1 ">
                  <span>{gig?.userId?.firstName}</span>
                  <span>{gig?.userId?.lastName}</span>
                </h6>
                <p>Posted : {gig?.createdAt}</p>
              </div>
              <div className="col-lg d-flex align-items-center gap-1">
                <button className="btn fw-bold d-flex align-items-center gap-1">
                  <FaEye />
                  {0}
                </button>
                <button className="btn fw-bold d-flex align-items-center gap-1">
                  <FaComment  />
                  {0}
                </button>
                <button className="btn fw-bold d-flex align-items-center gap-1">
                  <BiLike />
                  {0}
                </button>
                <button className="btn fw-bold d-flex align-items-center gap-1">
                  <FaShare />
                  {0}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GigCard;
