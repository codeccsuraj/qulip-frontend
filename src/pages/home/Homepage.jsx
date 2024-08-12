import React, { useState, useEffect } from 'react';
import { GigCard } from '../../components';
import { useGigContext } from '../../context';

const Homepage = () => {
  const { getAllGigs } = useGigContext();
  const [gigInfo, setGigInfo] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllGigData = async () => {
    try {
      const result = await getAllGigs();
      setGigInfo(result?.data || []);
    } catch (error) {
      console.error('Error fetching gigs:', error);
      setError('Error fetching gigs. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAllGigData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container-sm">
        {gigInfo?.length > 0 ? <h3>Latest Posts</h3> : null}
        <div className="row py-4">
          <div className="col-lg">
            <GigCard cardData={gigInfo} />
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Homepage;
