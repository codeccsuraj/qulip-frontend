import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context';
import { FaBell, FaRegQuestionCircle   } from "react-icons/fa";

const Navbar = () => {
    const { logoutHandler } = useAuthContext();

    return (
        <nav className='navbar navbar-expand-md bg-primary sticky-top'>
            <div className="container-sm">
                <Link to='/' className='navbar-brand fw-bold text-light'>Qulip</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <EmployerLinks logoutHandler={logoutHandler} />
                </div>
            </div>
        </nav>
    );
};

const EmployerLinks = ({ logoutHandler }) => {
    return (
        <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
                <Link to='/add-job' className='nav-link text-light'>Add Job</Link>
            </li>
            <li className='nav-item'>
                <Link to='/add-job' className='nav-link text-light'>View Applications</Link>
            </li>
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    My Account
                </Link>
                <ul className="dropdown-menu">
                    <li>
                        <Link to='/my-profile' className="dropdown-item">Update Profile</Link>
                    </li>
                    <li>
                        <Link to="#" className="dropdown-item fw-bold" onClick={logoutHandler}>Logout</Link>
                    </li>
                </ul>
            </li>
            <li className='nav-item'>
                <Link className='nav-link text-light'><FaRegQuestionCircle  /></Link>
            </li>
            <li className='nav-item'>
                <Link to='/add-job' className='nav-link text-light'><FaBell /></Link>
            </li>
        </ul>
    );
};

export default Navbar;
