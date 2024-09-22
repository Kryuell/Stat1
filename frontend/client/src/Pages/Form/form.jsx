import React from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import './form.css';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
import Footer from '../../Component/Footer/Footer';

function form() {
  return (
    <>
    <Navbar/>
    <section className="form-stati-section">
      <div className="form-stati">
        <h1 className="text-uppercase">form</h1>
        <form action="form" className="form-form">
          <label htmlFor="username" className="text-black-50">Full Name:</label>
          <input type="text" className="username"/>
          <label htmlFor="email" className="text-black-50">Email:</label>
          <input type="email" className="email"/>
          <label htmlFor="tel" className="text-black-50">Phone Number:</label>
          <input type="tel" className="tel"/>
          <label htmlFor="password" className="text-black-50">Password:</label>
          <input type="password" />
          <div className="form-btn">
            <button className="btn m-3" type="submit">Submit</button>
            <button className="btn m-3" type="reset"> Reset</button>
           
          </div>
          
          {/* <p>Do not have an account ! <Link to="/register">Create here</Link>.</p> */}
        </form>
        
      </div>
    </section>
    <div className="tt"></div>
    <Footer/>
    </>
  );
}

export default form;