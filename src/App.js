import React from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const theme = createTheme({
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/signin" replace />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route 
                        path="/home" 
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="/" element={<Navigate to="/home" replace />} />
                </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App;
