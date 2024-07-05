import React from 'react';
import './Header.css';

const Header = ({ currentTab, onTabChange }) => {
  return (
    <header className="header">
      <div className="logo"><i class="fa-brands fa-spotify"></i> Spotify</div>
      <img src="./Vikash_Img.png" alt="" className="footer-image" />
    </header>
  );
};

export default Header;
