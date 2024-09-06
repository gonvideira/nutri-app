import React from 'react';
import Navbar from './Navbar';  // Adjust the path as needed
import Footer from './Footer';  // Adjust the path as needed

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col s3 grey">
          <p>bar</p>
        </div>
        <div className="row s9 teal">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
