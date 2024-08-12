import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context'

const Navbar = () => {
    const {logoutHandler} = useAuthContext()
  return (
    <nav className='navbar navbar-expand-md bg-secondary sticky-top'>
        <div className="container-sm">
            <Link to='/' className='navbar-brand text-light fw-bold'>Qulip</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item'>
                        <Link to='/add-gig' className='nav-link text-light'>Add Posts</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link text-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            My Account
                        </Link>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to='/my-profile' className="dropdown-item">Update Profile</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item fw-bold" onClick={logoutHandler}>Logout</Link>
                            </li>
                        </ul>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link text-light'>Help</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar