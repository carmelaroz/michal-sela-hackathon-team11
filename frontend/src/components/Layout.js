import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="app-container">
        <header className="app-header">Safe Area</header>
        <main className="app-main">{children}</main>
        <footer className="app-footer">© 2025 Safe Area</footer>
        </div>
    );
};

export default Layout;