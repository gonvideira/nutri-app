import {React, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import { UserContext } from './utilities/context';

function App() {
  const [userData, setUserData] = useState(null);
  
  return (

    <UserContext.Provider value={{userData, setUserData}}>
      <Router>
        <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Layout>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
