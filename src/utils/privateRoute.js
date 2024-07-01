import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './authentication'

const PrivateRoute = () => {
    const {state} = useAuth();

    if(!state.isAuthenticated) {
        return <Navigate to="/" />
    }

    return <Outlet />
}

export default PrivateRoute