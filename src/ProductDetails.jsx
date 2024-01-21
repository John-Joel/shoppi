import React, { useEffect, useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsFillXCircleFill } from "react-icons/bs";
import "./ProductDetail.css"

const ProductDetails = ({ product, onClose, handleAddProduct, convertToINR }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const nextImage = () => {
        if (currentImageIndex === product.images.length - 1) {
            setCurrentImageIndex(0);
        } else {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }
    // const slideStyle = {
    //     transform: `translateX(-${currentImageIndex * currentImageIndex}0%)`, // Assuming each image takes up 100% of the container width
    // };

    const prevImage = () => {
        if (currentImageIndex === 0) {
            setCurrentImageIndex(product.images.length - 1);
        } else {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    // const handleAddProduct = (product) => {
    //     setCart(product);
    // }

    // useEffect(() => {
    //     const timer = setInterval(nextImage, 3000);
    //     return () => clearInterval(timer);
    // }, []);


    return (
        <div>
            <div className="productDisplaySection">
                <div className="productDisplayInfo">
                    <div className="imgContainer" >
                        <h1><BsChevronDoubleLeft onClick={prevImage} className="chevronLeft" /></h1>
                        <img src={product.images[currentImageIndex]} alt={`${product.title} - Image ${currentImageIndex + 1}`}
                            className="productDisplayimg" />
                        <h1><BsChevronDoubleRight onClick={nextImage} className="chevronRight" /></h1>
                    </div>
                    <div className="productImgInfo">
                        <p>Title: {product.title}</p>
                        <p>Price: 	&#8377;{convertToINR(product.price)}</p>
                        <p>Brand: {product.brand}</p>
                        <h1><BsFillXCircleFill onClick={onClose} className="closeIcon" /></h1>
                        <button className="buttonAddCart" onClick={() => handleAddProduct(product)}>Add to Cart</button>
                    </div>
                </div>
                <p className="productDescription">Description: {product.description}</p>
            </div >
        </div >
    );

};

export default ProductDetails;