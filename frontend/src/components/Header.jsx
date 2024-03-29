import React from 'react'
import { Nav, Navbar, Container, Badge, NavDropdown } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { resetCart } from '../slices/cartSlice'
import { toast } from 'react-toastify'
import SearchBox from './SearchBox'

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((store) => store.cart.cartItems)
    const userInfo = useSelector(store => store.auth.userInfo)

    const [logoutApiCall] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(resetCart());
            navigate('/login');
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand href='/'>
                            <img src={Logo} alt="EcomShop" />
                            Insta cart
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ms-auto">

                            <SearchBox />

                            <LinkContainer to='/cart'>
                                <Nav.Link><FaShoppingCart /> Cart
                                    {cartItems.length > 0 && <Badge pill bg='success' style={{ marginLeft: '5px' }}>{cartItems.reduce((acc, value) => acc + value.quantity, 0)}</Badge>}
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='name'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                (<LinkContainer to="/login">
                                    <Nav.Link><FaUser /> Sign In</Nav.Link>
                                </LinkContainer>)}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminMenu'>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header