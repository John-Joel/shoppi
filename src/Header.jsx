import { React, useEffect } from 'react';
import './HeaderCss.css';
import { FaOpencart, FaCartPlus, FaUserPlus } from 'react-icons/fa';
import Cart from './Cart';
import { Link, useNavigate } from 'react-router-dom'
const Header = (props) => {
    let Username = localStorage.getItem("name");
    const Navigate = useNavigate();

    const handleChange = (e) => {
        const searchTerm = e.target.value.replace(/[^a-z]/ig, '');
        props.setSearchTerm(searchTerm);
    };

    const handleAddAccount = () => {
        return Navigate("/RegistersPage");
    }

    const handleClearData = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("users");
        ;
        window.location.reload();
    }
    // console.log(localStorage("users"));

    return (
        <>
            <div className='header'>
                <div id="logo">
                    <FaOpencart className='img' />
                    <div id="logoName">Shoppi</div>
                </div>
                <div className='search-box'>
                    <input type="text" placeholder="Search for products" onChange={handleChange} />
                </div>
                <div id='registerBox'>
                    {(localStorage.getItem("name")) ?
                        (<div id='nameBox'><div id='UserName'>{Username}</div>
                            <div id='loginContainer'>
                                <div className="loginOption" onClick={handleAddAccount}><FaUserPlus />Add account</div>
                                <div className="loginOption" onClick={handleClearData}>Logout</div>
                            </div></div>)
                        : (<><Link to={"/RegisterPage"}><button className='register'>Sign in</button></Link>
                            <Link to={"/LoginPage"}><button className='register'>Log in</button></Link></>)}
                </div>
                <div className='cart-button'>
                    <FaCartPlus id='icons' onClick={props.ToggleCart} />
                    <span className='cart-count' onClick={props.ToggleCart}>{(props.cart.length)}</span>
                </div>
                {props.isCartVisible && (
                    <Cart cart={props.cart} isCartVisible={props.isCartVisible}
                        ToggleCart={props.ToggleCart} />)}
            </div >

        </>
    );
};

export default Header;