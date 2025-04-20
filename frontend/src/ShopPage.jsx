import React from 'react';
import HIW from './HIW';
import Shop from './Shop';

const ShopPage = () => {
return (
    <div style={{
        minHeight: '100vh',
        overflowX: 'hidden'
    }}>
        <h1 style={{
        textAlign: 'center',
        marginBottom: '2rem'
    }}>Grid Layout</h1>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, 1fr)',
            width: '80vw',
            height: '100vh',
            gap: '10px',
            margin: '0 auto',
            alignItems: 'center'
        }}>
            <HIW />
            <Shop />
        </div>
    </div>
    );
};

export default ShopPage;