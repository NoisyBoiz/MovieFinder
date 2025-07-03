import React from 'react';
import Header from '../component/header';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
import '../styles/layout.css';
function Layout({children}){
    return (
        <>
        <Header/>
        <div className='navbarContainer'> <Navbar/> </div>
        <div className="mainContainer"> 
            <div className="mainContent">
                {children}
            </div>
            <Footer/>
        </div> 
        </>
    )
}
export default Layout;