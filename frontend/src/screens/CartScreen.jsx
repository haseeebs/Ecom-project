import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { addToCart, removeFromCart } from '../slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Card, ListGroup, Image, Button } from 'react-bootstrap'
import Message from '../components/Message'


const CartScreen = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((store) => store.cart)

    const handleAddToCart = (product, quantity) => {
        dispatch(addToCart({ ...product, quantity }))
    }

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    return (
        <Row>
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <Message>Your cart is empty <Link to={'/'}>Go Back</Link></Message>
                ) : (
                    <ListGroup variant='flush'>

                        {cartItems.map((item) => (

                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>

                                    <Col md={3} className="d-flex align-items-center">
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2} className="d-flex align-items-center">
                                        ${item.price}
                                    </Col>

                                    <Col md={2} className="d-flex align-items-center">
                                        <Form.Select value={item.quantity} onChange={(e) => handleAddToCart(item, Number(e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(count => (
                                                <option key={count + 1} value={count + 1}>{count + 1}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>

                                    <Col md={2} className="d-flex align-items-center">
                                        <Button type='button' variant='light' onClick={(e) => handleRemoveFromCart(item._id)}> <FaTrash /> </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                        ))}

                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0}>Proceed to checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen