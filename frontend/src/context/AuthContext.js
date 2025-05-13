import { createContext, useContext, useReducer, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Reducer function for auth state
const authReducer = (state, action) => {
switch (action.type) {
    case 'LOGIN':
    localStorage.setItem('user', JSON.stringify(action.payload));
    return { user: action.payload };
    case 'LOGOUT':
    localStorage.removeItem('user');
    return { user: null };
    default:
    return state;
}
};

// Provider component
export const AuthProvider = ({ children }) => {
const [state, dispatch] = useReducer(authReducer, { user: null });

// Restore user from localStorage on app load
useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
    try {
        const storedUser = JSON.parse(userString);
        if (storedUser) {
        dispatch({ type: 'LOGIN', payload: storedUser });
        }
    } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('user'); // Remove the corrupted value
    }
    }
}, []);

return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
    {children}
    </AuthContext.Provider>
);
};

// Hook to use the auth context
export const useAuthContext = () => {
return useContext(AuthContext);
};