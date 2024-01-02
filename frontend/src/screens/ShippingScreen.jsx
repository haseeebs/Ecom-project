import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {

    const shippingAddress = useSelector(store => store.cart.shippingAddress);

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>

            <Form onSubmit={handleSubmit}>

                <Form.Group controlId='address' className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type='text' placeholder='Enter address' value={address} onChange={event => setAddress(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control required type='text' placeholder='Enter city' value={city} onChange={event => setCity(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='my-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Postal code' value={postalCode} onChange={event => setPostalCode(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='country' className='my-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control required type='text' placeholder='Enter country' value={country} onChange={event => setCountry(event.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-2'>Continue</Button>

            </Form>

        </FormContainer>
    )
}

export default ShippingScreen