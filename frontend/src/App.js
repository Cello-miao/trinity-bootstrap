import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import './App.css';

function AuthSwitch() {
  const [showLogin, setShowLogin] = useState(true);

  return showLogin ? (
    <Login onSwitchToRegister={() => setShowLogin(false)} />
  ) : (
    <Register onSwitchToLogin={() => setShowLogin(true)} />
  );
}

function AppContent() {
  const { isAuthenticated, user, logout, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AuthSwitch />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1></h1>
        <div className="user-info">
          <span>Welcome, {user?.username}!</span>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
