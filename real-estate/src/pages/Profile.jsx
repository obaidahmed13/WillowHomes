import { useState } from "react";
import { useSelector } from "react-redux";
import { updateUserStart, updateUserSucess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserSuccess, signOutUserStart } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {UserIcon} from '@heroicons/react/24/outline'

export const Profile = () => {
  const [formData, setFormData] = useState({});
  const {currentUser, loading, error} = useSelector((state) => state.user);
  // allow read;
  // allow write: if 
  // request.resource.size<2*1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  const[showListingError, setShowListingError] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch= useDispatch();
  const [userListings, setUserListings] = useState([])
  const handleChange = (e) => {
    // updating form data, create new object using spread operator, 
    // Updating property with id to the new value entered
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSucess(data));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  
  const handleSignOut = async() => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch ('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl front-semibold text-center my-5">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <UserIcon className=' rounded-full h-16 w-16 object-cover self-center'/>
        <label>Username: </label>
        <input 
          type="text" 
          placeholder="username" 
          className="border p-3 rounded-lg" 
          id='username'
          defaultValue={currentUser.username}
          onChange={handleChange}/>
        <label>Email: </label>
        <input 
          type="email" 
          placeholder="email" 
          className="border p-3 rounded-lg" 
          id='email'
          defaultValue={currentUser.email}
          onChange={handleChange}/>
        <label>Password: </label>
        <input 
          type="password" 
          placeholder="password" 
          className="border p-3 rounded-lg" 
          id='password'
          onChange={handleChange}/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-70">
        {loading? 'Loading...' : 'Update'}
        </button>
        <Link to={"/create-listing"} className="bg-blue-600 text-white rounded-lg p-3 uppercase hover:opacity-70 text-center">
        Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-600 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-600 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-600 mt-5">{error? error: ''}</p>
      <p className="text-blue-600 mt-5">{updateSuccess? 'Success': ''}</p>
      <button onClick={handleShowListings} className="text-blue-600 w-full">Show Listings</button>
      <p>{showListingError? 'Error showing listings': ''}</p>
      
      {userListings && userListings.length>0 && (
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-2xl font-semibold">Your Listings</h1>
      {userListings.map((listing) => (
        <div key={listing._id} className="border p-3 flex justify-between
         items-center gap-4">
          <Link to={(`/listing/${listing._id}`)}>
            <img src={listing.imageUrls[0]} alt="listing image" 
            className="h-20 w-20 object-contain"
            />
          </Link >
          <Link className="text-gray-500 font-semibold flex-1 hover:underline truncate" to={(`/listing/${listing._id}`)}>
            <p >{listing.name}</p>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => handleListingDelete(listing._id)} className="text-red-600 ">Delete</button> <span>|</span>
            <Link to={`/update-listing/${listing._id}`}> 
              <button className="text-blue-600 ">Edit</button>
              </Link>
          </div>
        </div>
      ))}
      </div>)}
    </div>
  )
}
