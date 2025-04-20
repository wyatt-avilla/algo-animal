import React from 'react';

// SmallBox.jsx
function Shop() {
    return (
        <div style={{
            gridColumn: '4 / span 1',
            gridRow: '1 / span 4',
            backgroundColor: '#f6ad55',
            display: 'grid',
            // flexDirection: 'column',
            // alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            height: '80vh',

            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(3, 1/3fr)'
        }}>
            <div style={{
                gridColumn: '1/span 2',
                textAlign: 'center'
            }}>
                <p>Shop</p>
            </div>
            <div style={{
                gridRow: '2/span 2',
                gridColumn: '1 / span 2'
            }}>
                <ul style = {{
                    
                }}>
                    <li>jo</li>
                    <li>jo</li>
                    <li>jo</li>
                    <li>jo</li>
                    <li>jo</li>
                </ul>
            </div>
        </div>
    );
}

export default Shop;
