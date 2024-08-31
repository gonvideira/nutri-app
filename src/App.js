import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';

function App() {
  return (
    <Layout>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </Layout>
  );
}

export default App;
