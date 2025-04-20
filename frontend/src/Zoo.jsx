import React from 'react';
import { useNavigate } from 'react-router-dom';

const Zoo = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/grid');
    };
    
    return (
        <div>
            <h1>Your Zoo</h1>
            <div style={{
                width: '80vw',
                height: '80vh',
                backgroundColor: 'green',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                flexDirection: 'column',
                margin: '0 auto'
            }}>
                {/* <button
                    onClick={handleClick}
                    style={{
                        position: 'absolute',
                        top: '90%',
                        padding: '10px 20px',
                        fontSize: '16px'
                    }}
                >
                    Go to Your Zoo!
                </button> */}
            </div>
        </div>
    );
};

export default Zoo;