import React from 'react';

// SmallBox.jsx
function Shop() {
    return (
        <div style={{
            gridColumn: '4 / span 1',
            gridRow: '1 / span 4',
            backgroundColor: '#f6ad55',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            height: '80vh'
        }}>
            Small Box
        </div>
    );
}

export default Shop;
