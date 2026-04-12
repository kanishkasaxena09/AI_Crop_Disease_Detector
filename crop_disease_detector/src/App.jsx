// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/approutes';
import Navbar from './components/layout/navbar'; // File ban gayi hai, ab error nahi aayega
import Footer from './components/layout/footer'; // File ban gayi hai

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar /> 
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;