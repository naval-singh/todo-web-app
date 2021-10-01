import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { resetUser, signout } from '../../redux/actions'

const Header = (props) => {

    const dispatch = useDispatch()
    const { authenticate } = useSelector(state => state.userDetails)

    const handleLogout = () => {
        dispatch(signout())
    }

    const handleReset = () => {
        dispatch(resetUser())
    }

    const renderNonLoggedInMenu = () => (
        <Nav>
            <li className="nav-item">
                <NavLink to="/signin" onClick={handleReset} className="nav-link" >SignIn</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/signup" onClick={handleReset} className="nav-link">SignUp</NavLink>
            </li>
        </Nav>
    )

    const renderLoggedInMenu = () => (
        <Nav>
            <li className="nav-item">
                <span onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }} >Logout</span>
            </li>
        </Nav>
    )


    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
            <Container fluid>
                <Link to="/" className="navbar-brand">Todo List</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    {authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header