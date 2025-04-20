import React from 'react'

const ShopPreview = () => {
    return(
        <div style={{
            gridColumn: '1 / span 3',
            gridRow: '1 / span 4',
            backgroundColor: '#63b3ed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            height: '80vh'
        }}>
            <h1>*Insert Image of Sprite w/ Cosmetics*</h1>
        </div>
    );
}

export default ShopPreview;