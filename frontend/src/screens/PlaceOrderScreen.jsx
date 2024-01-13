import { useEffect } from "react"
import Loader from "../components/Loader"
import Message from "../components/Message"
import CheckoutSteps from "../components/CheckoutSteps"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearCartItems } from "../slices/cartSlice"
import { useCreateOrderMutation } from "../slices/orderApiSlice"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"


const PlaceOrderScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { shippingAddress, paymentMethod, cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector(store => store.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation()

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        } else if (!paymentMethod) {
            navigate('/payment')
        }
    }, [shippingAddress, paymentMethod, navigate])

    const handlePlaceOrder = async () => {
        try {
            const res = await createOrder(
                {
                    orderItems: cartItems,
                    itemsPrice,
                    paymentMethod,
                    shippingAddress,
                    shippingPrice,
                    taxPrice,
                    totalPrice
                }
            ).unwrap();

            dispatch(clearCartItems());
            navigate(`/order/${res.order._id}`)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>

                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <strong>Address: </strong>
                            {shippingAddress.address} ,
                            {shippingAddress.city.charAt(0).toUpperCase() + shippingAddress.city.slice(1)}{' '}
                            {shippingAddress.postalCode},{' '}
                            {shippingAddress.country.toUpperCase()}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <strong>Order Items</strong>
                            {cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">

                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}

                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">

                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {error &&
                                <ListGroup.Item>
                                    <Message variant="danger">{error}</Message>
                                </ListGroup.Item>
                            }

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={handlePlaceOrder}
                                >Place order</Button>
                            </ListGroup.Item>

                            {isLoading && <Loader />}

                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default PlaceOrderScreen