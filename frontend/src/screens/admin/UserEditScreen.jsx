import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/usersApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";

const UserEditScreen = () => {

    const { id: userId } = useParams();
    const navigate = useNavigate();

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateUser({ userId, name, email, isAdmin });
            refetch();
            toast.success('User updated');
            navigate('/admin/userlist');

        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    return (
        <>
            <Link to={'/admin/userlist'} className="btn btn-light my-3">Go back</Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}

                {isLoading ? <Loader /> : error ? <Message variant="danger">{error?.data?.message || error.error}</Message> : (
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="name" className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email" className="my-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="isAdmin" className="my-2">
                            <Form.Check
                                type="checkbox"
                                label='isAdmin'
                                checked={isAdmin}
                                onChange={event => setIsAdmin(event.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="my-2">Update</Button>

                    </Form>
                )}
            </FormContainer>
        </>

    )
}

export default UserEditScreen