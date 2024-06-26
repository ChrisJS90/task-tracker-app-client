import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './authentication'

const PrivateRoute = () => {
    const {state} = useAuth();

    return state.isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute