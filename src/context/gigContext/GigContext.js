import { createContext } from "react";
import { GET_GIGS_USERID, GIG_URL } from "../../api/endpoints";
import toast from "react-hot-toast";

export const GigContext = createContext();

const GigContextProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    const addGig = async (data) => {
        try {
            const response = await fetch(GIG_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer${token}`
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Failed to add gig');
            }
            if (response.ok) {
                window.location.href = '/'
            }
            const result = await response.json();
            toast.success("posted successfully")
            return result;
        } catch (error) {
            console.error('Error adding gig:', error);
            throw error;
        }
    }

    const getGigById = async (id) => {
        try {
            const response = await fetch(`${GIG_URL}/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch gigs');
            }
            const gigs = await response.json();
            return gigs;
        } catch (error) {
            console.error('Error fetching gigs:', error);
            throw error;
        }
    }

    const getAllGigs = async () => {
        try {
            const response = await fetch(GIG_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch gigs');
            }
            const gigs = await response.json();
            return gigs;
        } catch (error) {
            console.error('Error fetching gigs:', error);
            throw error;
        }
    }

    const getGigDataByUserId = async (userId) => {
        try {
            const response = await fetch(`${GET_GIGS_USERID}/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch gigs');
            }
            const gigs = await response.json();
            return gigs;
        } catch (error) {
            console.error('Error fetching gigs:', error);
            throw error;
        }
    };

    const deleteGigById = async (gigId) => {
        try {
            const response = await fetch(`${GIG_URL}/${gigId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete gigs');
            }

            toast.success("deleted successfully");
        } catch (error) {
            console.error("this is", error);
            if (error.message !== 'Unauthorized') {
                toast.error(error?.message || 'An error occurred');
            }
        }
    }

    const updateGig = async (id, data) => {
        try {
            const response = await fetch(`${GIG_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer${token}`,
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to add gig');
            }
            if (response.ok) {
                window.location.href = '/my-profile'
            }

            const result = await response.json();
            toast.success("updated successfully")
            return result; 
        } catch (error) {
            console.error('Error updating gig:', error);
            throw error;
        }
    }
    return (
        <GigContext.Provider value={{ addGig, updateGig, getAllGigs, getGigDataByUserId, deleteGigById, getGigById }}>
            {children}
        </GigContext.Provider>
    )
}

export default GigContextProvider;