import React from 'react';
import './HubPage.css';
import { FaUserCircle, FaQuestionCircle, FaStore, FaCode, FaPaw } from 'react-icons/fa';

const HubPage = () => {
  return (
    <div className="hub-container">
      {/* Top Bar */}
      <div className="top-bar">
        <FaUserCircle className="icon user-icon" />
        <FaQuestionCircle className="icon faq-icon" title="FAQ" />
      </div>

      {/* Middle - Sprite + Bamboo BG */}
      <div className="middle-content">
        <img
          src="/assets/backgrounds/bamboo.png"
          alt="Bamboo Background"
          className="bamboo-background"
        />
        <img
          src="/assets/sprites/your-sprite.png"
          alt="Your Pet"
          className="sprite"
        />
      </div>

      {/* Bottom Buttons */}
      <div className="bottom-nav">
        <button className="nav-btn" title="Zoo">
          <FaPaw />
        </button>
        <button className="nav-btn" title="Code">
          <FaCode />
        </button>
        <button className="nav-btn" title="Shop">
          <FaStore />
        </button>
      </div>
    </div>
  );
};

export default HubPage;
