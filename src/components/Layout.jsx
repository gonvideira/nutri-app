import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          
          <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <p>bar</p>
          </div>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>

        </div>
      </div>
      
      <Footer />
    
    </>
  )
}

export default Layout