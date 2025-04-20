import React from 'react'
//import Phaser from 'phaser'

const Homepage = () => {
    return (
        <div style={
            {
                width: '80vw',
                height: '80vh',
                backgroundColor: 'green',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                flexDirection: 'column'
            }
        }>
            <button style={
                {
                    position: 'absolute',
                    top: '90%',
                    // transform: 'translateY(-50%)',
                    padding: '10px 20px',
                    fontSize: '16px'
                }
            }>
                Click Me
            </button>
        </div>
    );
}

export default Homepage;