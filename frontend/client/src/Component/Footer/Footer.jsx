import React from 'react';
import './Footer.css';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import morroco from '../../Assests/maroc-logo.png';
import { Mail, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <>
    <section className="footer-section">
      <div className="footer-left">
        <h1>Statify</h1>
        <ul>
          <li ><a href="mailto:Bouayadihamid@gmail.com" ><Mail/> Gmail</a></li>
          <li><a href="linkedin.com/in/mounim-nadir-b6575b27a"><Linkedin  /> LinkedIn</a></li>
          <li><a href="https://x.com/AbdelKhouda"><Twitter  /> Twitter</a></li>
        </ul>
      </div>
      <div className="footer-right">
        <img src={morroco} alt="logomoroccoimage"/>
        <p className="text-black-50">Copyright © 2024 Statify Team. All Rights Reserved.</p>
      </div>
    </section>
    </>
  );
};

export default Footer;
