import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useProfileMutation } from "../slices/usersApiSlice"
import { LinkContainer } from "react-router-bootstrap";
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

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo , userInfo.name, userInfo.email]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password do not match');
        } else {
            try {
                const res = await updateProfile({ name, email, password }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully')
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

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
            <Col md={9}>colun</Col>
        </Row>
    )
}

export default ProfileScreen