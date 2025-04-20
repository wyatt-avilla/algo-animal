import React from 'react'
import { useNavigate } from 'react-router-dom'
import a1BackgroundImage from '/assets/a1BackgroundImage.png'

const Homepage = () => {
  const navigate = useNavigate();
  
  // sends user to Zoo Page
  const handleClick = () => {
    navigate('/zoo');
  };
  
  // Add an inline style element for the animation
  const scrollingAnimation = `
    @keyframes scrollBackground {
      from { background-position: 0 0; }
      to { background-position: 0 100%; }
    }
  `;
  
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      position: 'relative',
      backgroundImage: `url(${a1BackgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      animation: 'scrollBackground 15s linear infinite',
    }}>
      <style>
        {scrollingAnimation}
      </style>
      
      <div style={{
        position: 'absolute',
        //top : '20%',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1 style={{ 
          color: 'white', 
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          marginBottom: '20px'
        }}>
          Algo Animal's
        </h1>
        
        <button
          onClick={handleClick}
          style={{
            position: 'absolute',
            bottom: '10%',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'red',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
          }}
        >
          Go to Your Zoo
        </button>
      </div>
    </div>
  );
};

export default Homepage;