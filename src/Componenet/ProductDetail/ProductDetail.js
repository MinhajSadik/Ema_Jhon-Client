import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [loading, setLoading] = useState(true);
    const product = fakeData.find(pd => pd.key === productKey);

    document.title = "Product Details";

    useEffect(() => {
        fetch('/product' + productKey)
            .then(res => res.json())
            .then(data => {
                // setProduct(data);
                setLoading(false);
        })
    }, [productKey])
    return (
        <div>
            <h1>Id: {productKey} && Product Details Here!!</h1>
            <Product showAddToCart={false} product={product} />
            {
                loading ? <p>Loading...</p> :
                    <Product showAddToCart={false} product={product}/>
            }
        </div>
    );
};

export default ProductDetail;