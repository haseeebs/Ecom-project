import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useProfileMutation } from "../slices/usersApiSlice"
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes } from 'react-icons/fa';
import { Button, Col, Form, FormGroup, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";


const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    
    const { userInfo } = useSelector(store => store.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    const { data: orders, isLoading, error } = useGetMyOrdersQuery(userInfo._id);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, userInfo.name, userInfo.email]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({ name, email, password }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully');
                setPassword('');
                setConfirmPassword('');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                <Form onSubmit={handleSubmit}>

                    <FormGroup controlId='name' className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId='email' className="my-2">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId='password' className="my-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId='confirmPassword' className="my-2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter confirm password"
                            value={confirmPassword}
                            onChange={event => setConfirmPassword(event.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <Button type="submit" variant="primary" className="my-2">Update</Button>
                    {loadingUpdateProfile && <Loader />}
                </Form>
            </Col>

            <Col md={9}>
                <h2>Orders</h2>

                {isLoading ? <Loader /> : error ? <Message variant="danger">{error?.data?.message || error.error}</Message> : (

                    <Table striped hover responsive className="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (order.paidAt.substring(0, 10)) : (<FaTimes style={{ color: 'red' }} />)}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<FaTimes style={{ color: 'red' }} />)}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="light">Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen