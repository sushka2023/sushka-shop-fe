import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { fetchUser } from '../store/slices/user-slice';
import { useSelector, useDispatch } from 'react-redux';
import React, {useEffect} from 'react';

const ProtectedRoute = ( {children} ) => {
  const { accessToken } = useSelector((state) => state.auth)
  const { user, isLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if(accessToken && !user && !isLoading) {
        dispatch(fetchUser())
    }
  }, [accessToken, user]) 

    console.log('allo', accessToken)
  // show unauthorized screen if no user is found in redux store
  if (!accessToken) {
    return (
        <Navigate to="/" replace />
    )
  }

  // returns child route elements
  return children || <Outlet />
}
export default ProtectedRoute;