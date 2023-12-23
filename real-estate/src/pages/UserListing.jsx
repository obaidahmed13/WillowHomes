import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserListing() {
    const [userListings, setUserListings] = useState([])
    const [showListingError, setShowListingError] = useState(false)
    const {currentUser} = useSelector((state) => state.user);
    const handleShowListings = async () => {
        
        try {
          setShowListingError(false);
          const res = await fetch(`/api/user/listings/${currentUser._id}`);
          const data = await res.json();
          if (data.success === false) {
            setShowListingError(true);
            return;
          }
          setUserListings(data)
        } catch (error) {
          setShowListingError(true)
        }
      }
    
      const handleListingDelete = async (listingId) => {
        try {
          const res = await fetch (`/api/listing/delete/${listingId}`, {
            method: 'DELETE'
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return
          }
          setUserListings((prev) => prev.filter((listing)=> listing._id !== listingId))
        } catch (error) {
          console.log(error.message)
        }
      }

      useEffect(()=> {
        handleShowListings();
      }, [])




  return (
    
    <div className="p-8 ">
    <p>{showListingError ? 'Error showing listings' : ''}</p>
    {userListings==0? 
    <Link to='/create-listing' className="text-blue-500 ">Create Listing... </Link>
    : ''}
    
    {userListings && userListings.length>0 && (
      <div className="flex flex-col gap-5">
        <div className="text-center">
            <h1 className=" text-3xl font-semibold text-gray-600">Your Listings</h1>
            <Link to='/create-listing' className="text-blue-700">Create Listing...</Link>
        </div>
        <div className="flex flex-wrap justify-between gap-5 ">
      {userListings.map((listing) => (
        <div key={listing._id} className=" w-[48%] border p-3 flex justify-between
         items-center gap-4 shadow-lg hover:scale-105 transition-scale duration-300 rounded-xl hover:bg-gray-100">
          <Link to={(`/listing/${listing._id}`)}>
            <img src={listing.imageUrls[0]} alt="listing image" 
            className="h-20 w-25 object-contain"
            />
          </Link >
          <Link className="text-gray-500 font-semibold flex-1 hover:underline truncate ml-4 text-lg" to={(`/listing/${listing._id}`)}>
            <p >{listing.name}</p>
          </Link>
          <div className="flex items-center gap-2 mr-6">
            <button onClick={() => handleListingDelete(listing._id)} className="text-red-600 hover:scale-110 transition-scale duration-300">Delete</button> <span>|</span>
            <Link to={`/update-listing/${listing._id}`}> 
              <button className="text-blue-600 hover:scale-110 transition-scale duration-300">Edit</button>
              </Link>
          </div>
        </div>
      ))}</div>
      </div>)}
      

    </div>
  )
}
