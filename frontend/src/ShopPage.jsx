import React from 'react';
import ShopPreview from './ShopPreview';
import Shop from './Shop';

const ShopPage = () => {
return (
    <div style={{
        minHeight: '100vh',
        overflowX: 'hidden'
    }}>
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
            <ShopPreview />
            <Shop />
        </div>
    </div>
    );
};

export default ShopPage;