import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRoute() {
    // Use the useSelector hook to get the currentUser from the Redux store
    const {currentUser} = useSelector((state) => state.user)
  // Check if currentUser exists; if yes, allow access to the nested Outlet (child routes)
  // If currentUser does not exist, redirect to the '/sign-in' route using the Navigate component
  return currentUser ? <Outlet/> : <Navigate to='/sign-in' />
}
