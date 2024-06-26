import React, { createContext, useContext, useReducer, useEffect} from "react";
import { useNavigate } from "react-router-dom";


// Create a context for authentication
const AuthContext = createContext();

// Define the initial state for the authentication context
const initialState = {
    isAuthenticated: false, 
    token: null,            
    user: null              
};

// Define a reducer function to handle different authentication actions
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true, 
                token: action.payload.token, 
                user: action.payload.user   
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false, 
                token: null,            
                user: null              
            };
        default:
            return state;
    }
};

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState); // Use reducer to manage auth state
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        const token = localStorage.getItem('Token'); // Retrieve token from local storage
        if (token) {
            dispatch({
                type: 'LOGIN',
                payload: { token }
            });
        } else {
            navigate('/login'); // Navigate to login if no token is found
        }
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
