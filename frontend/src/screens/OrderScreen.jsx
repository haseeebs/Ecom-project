import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation, useDeliverOrderMutation } from "../slices/orderApiSlice";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector(store => store.auth);

    useEffect(() => {

        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadingPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client=id': paypal.clientId
                    },
                    currency: 'USD'
                })
            }
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });

            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadingPayPalScript();
                }
            }
        }

    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

    // const onApproveTest = async () => {
    //     await payOrder({ orderId, details: { payer: {} } });
    //     refetch();
    //     toast.success('Payment Successful');
    // }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success('Payment Successful');
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        })
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice
                    }
                }
            ]
        }).then((orderId) => orderId)
    }

    const onError = (error) => {
        toast.error(error.message);
    }

    const handleDeliverOrder = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered');
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">No order found</Message>
    ) : (
        <>
            <h2>Order ID: {order._id}</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p>
                                <strong>Name: </strong>{order.user.name}
                            </p>

                            <p>
                                <strong>Email: </strong>{order.user.email}
                            </p>

                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address},{' '}
                                {order.shippingAddress.city.charAt(0).toUpperCase() + order.shippingAddress.city.slice(1)}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country.charAt(0).toUpperCase() + order.shippingAddress.country.slice(1)}
                            </p>

                            {order.isDelivered ? (
                                <Message variant="success">Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant="danger">Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Mehtod: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant="danger">Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {order.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>

                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={4}>
                                            {item.quantity} x {item.price} = ${item.quantity * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {isPending ? <Loader /> : (
                                        <div>
                                            {/* <Button onClick={onApproveTest} style={{ marginBottom: '10px' }}>Test Pay Order</Button> */}

                                            <div>
                                                <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                                            </div>
                                            <p>If you don't see the payment options , you can try refreshing the page.</p>
                                            <p>
                                                    To perform a fake payment, use the following credentials:
                                                    <br />
                                                    <strong>Email: </strong>sb-u247bx29285151@personal.example.com
                                                    <br />
                                                    <strong>Password: </strong>ecomPayment
                                                </p>
                                        </div>
                                    )}
                                </ListGroup.Item>
                            )}

                            {loadingDeliver && <Loader />}

                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (

                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block" onClick={handleDeliverOrder}>Mark as delivered</Button>
                                </ListGroup.Item>

                            )}

                        </ListGroup>

                    </Card>
                </Col>
            </Row >
        </>
    );
};

export default OrderScreen;
