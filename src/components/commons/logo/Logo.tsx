import React from 'react'
import './Logo.css'
const Logo = () => {
  return (
    <div className='logo'>
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_Drive_logo.png/1200px-Google_Drive_logo.png"
        }
        width="48px"
        height="48px"
      />
      <span className='bold'>Muggle Drive</span>
    </div>
  );
}

export default Logo;