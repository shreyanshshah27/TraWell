import React, { useState, useEffect,useContext } from 'react';
import { Button } from '../../assets/Button/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { userContext } from '../../context/index';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navbar, setNavbar] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const UserContext = useContext(userContext);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    const changeBackground = () =>{
        if(window.scrollY >= 80){
            setNavbar(true);
        }else{
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeBackground);    

    return (
        <>
            <nav className='navbar active'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        TraWell
            <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/lendcar'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Lend Your Car
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/rent'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Rent a Car
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/aboutUs'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                About Us
                            </Link>
                        </li>

                        {
                            UserContext.currentUser.userEmail === ""
                                ? 
                                <li>
                                    <Link
                                        to='/user/signin'
                                        className='nav-links-mobile'
                                        onClick={closeMobileMenu}
                                    >
                                        Log In
                                    </Link>
                                </li> 
                                :
                                <div>
                                    <li>
                                        <Link
                                            to='/userProfile'
                                            className='nav-links-mobile'
                                            onClick={closeMobileMenu}
                                        >
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/user/signin'
                                            className='nav-links-mobile'
                                            onClick={closeMobileMenu}
                                        >
                                            Log Out
                                        </Link>
                                    </li>
                                </div>
                                
                        }
                    </ul>
                    {
                        UserContext.currentUser.userEmail !== ""
                            ?
                            <>
                                {button && <Button buttonStyle='btn--outline' style={{ marginRight: '2.5vw' }} link="/user/signin" >LOG IN</Button>}
                            </>
                            :
                            <>
                                {
                                    button
                                    &&
                                    <>
                                        <Button buttonStyle='btn--outline' style={{ marginRight: '2.5vw' }} link="/user/signin" >My Profile</Button>
                                        &nbsp; &nbsp;
                                        <Button buttonStyle='btn--outline' style={{ marginRight: '2.5vw' }} link="/user/signin" >LogOut</Button>
                                    </>
                                }
                            </>
                    }
                </div>
            </nav>
        </>
    );
}

export default Navbar;
