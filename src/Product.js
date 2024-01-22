import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails.js';
import './Product.css'

const Product = (props) => {
    const [products, setProducts] = useState([]);
    const [sortByPriceLow, setSortByPriceLow] = useState();
    const [sortByPriceHigh, setSortByPriceHigh] = useState();
    const [selectedBrands, setSelectedByBrands] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        axios.get('https://dummyjson.com/products').then((response) => {
            setProducts(response.data.products);
        });

    }, []);

    const handleSortByPricelow = () => {
        setSortByPriceLow(!sortByPriceLow);
    };

    const handleSortByPricehigh = () => {
        setSortByPriceHigh(!sortByPriceHigh);
    };

    const handleFilterByBrand = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedByBrands(selectedBrands.filter((selectedBrand) => selectedBrand !== brand));
        } else {
            setSelectedByBrands([...selectedBrands, brand]);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.category.toLowerCase().includes(props.searchTerm)
    );

    const filteredBrand = selectedBrands.length > 0
        ? filteredProducts.filter((product) => selectedBrands.includes(product.brand))
        : filteredProducts;

    if (sortByPriceLow) {
        filteredBrand.sort((a, b) => a.price - b.price);
    }
    if (sortByPriceHigh) {
        filteredBrand.sort((a, b) => b.price - a.price);
    }

    const handleCloseDetails = () => {
        setSelectedProduct(null);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    }

    return (
        <div id='section'>
            <div className='sideBar'>
                <div className='barContainer'>
                    <h4>Filter by Price</h4>
                    <label className="inlineSidebar">
                        low to high
                        <input className='checkBox'
                            type="checkbox"
                            checked={sortByPriceLow}
                            onChange={handleSortByPricelow}
                        />
                    </label>
                </div>
                <div className='barContainer'>
                    <label className="inlineSidebar">
                        high to low
                        <input className='checkBox'
                            type="checkbox"
                            checked={sortByPriceHigh}
                            onChange={handleSortByPricehigh}
                        />
                    </label>
                </div>
                <div className='barContainer'>
                    <h4>Filter by Brand</h4>
                    <label className="inlineSidebar">
                        Apple
                        <input className='checkBox'
                            type="checkbox"
                            onChange={() => handleFilterByBrand('Apple')}
                            checked={selectedBrands.includes('Apple')}
                        />

                    </label>
                </div>
                <div className='barContainer'>
                    <label className="inlineSidebar">
                        OPPO
                        <input className='checkBox'
                            type="checkbox"
                            onChange={() => handleFilterByBrand('OPPO')}
                            checked={selectedBrands.includes('OPPO')}
                        />

                    </label>
                </div>
                <div className='barContainer'>
                    <label className="inlineSidebar">
                        Samsung
                        <input className='checkBox'
                            type="checkbox"
                            onChange={() => handleFilterByBrand('Samsung')}
                            checked={selectedBrands.includes('Samsung')}
                        />

                    </label>
                </div>
                <div className='barContainer'>
                    <label className="inlineSidebar">
                        Huawei
                        <input className='checkBox'
                            type="checkbox"
                            onChange={() => handleFilterByBrand('Huawei')}
                            checked={selectedBrands.includes('Huawei')}
                        />

                    </label>
                </div>
                <div className='barContainer'>
                    <label className="inlineSidebar">
                        HP Pavilion
                        <input className='checkBox'
                            type="checkbox"
                            onChange={() => handleFilterByBrand('HP Pavilion')}
                            checked={selectedBrands.includes('HP Pavilion')}
                        />

                    </label>
                </div>
                <div className='barContainer'>
                    <label className="inlineSidebar">
                        Royal_Mirage
                        <input className='checkBox'
                            type="checkbox"
                            onChange={() => handleFilterByBrand('Royal_Mirage')}
                            checked={selectedBrands.includes('Royal_Mirage')}
                        />
                    </label>
                </div>
                <div className='barContainer'>
                    <label className="inlineSidebar">
                        Hemani Tea
                        <input className='checkBox'
                            type="checkbox"
                            onChange={() => handleFilterByBrand('Hemani Tea')}
                            checked={selectedBrands.includes('Hemani Tea')}
                        />

                    </label>
                </div>
                <div className='barContainer'>
                    <label className="inlineSidebar">
                        Fauji
                        <input className='checkBox'
                            type="checkbox"
                            onChange={() => handleFilterByBrand('fauji')}
                            checked={selectedBrands.includes('fauji')}
                        />
                    </label>
                </div>
                <div className='barContainer'>
                    <label className="inlineSidebar">
                        Golden
                        <input className='checkBox'
                            type="checkbox"
                            onChange={() => handleFilterByBrand('Golden')}
                            checked={selectedBrands.includes('Golden')}
                        />

                    </label>
                </div>
                <div className='barContainer'>
                    <label className="inlineSidebar">
                        LED Lights
                        <input className='checkBox'
                            type="checkbox"
                            onChange={() => handleFilterByBrand('LED Lights')}
                            checked={selectedBrands.includes('LED Lights')}
                        />

                    </label>
                </div>

            </div>



            < div className='content'>
                {selectedProduct ? (
                    <ProductDetails product={selectedProduct} Product={Product}
                        handleAddProduct={props.handleAddProduct} onClose={handleCloseDetails} convertToINR={props.convertToINR} />
                ) : (
                    <div className='productList'>
                        {filteredBrand.map((product) => (
                            <div key={product.id} className='product' onClick={() => handleProductClick(product)}>
                                <div className='picContainer'>
                                    <img src={product.images[0]} alt='product' />
                                </div>
                                <h5 className='productInfo'>{product.title}</h5>
                                <p className='price'>Price: &#8377;{props.convertToINR(product.price)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Product;