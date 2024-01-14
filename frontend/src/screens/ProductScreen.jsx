import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  // Hooks and state initialization
  const { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  // Event handler for quantity change
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value))
  }

  // Event handler for adding to cart
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/cart');
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {isLoading && <Loader />}

      {error && <Message variant='danger'>{error?.data?.message || error.error}</Message>}

      {product && (
        <>
          <Row>
            <Col md={5}>
              <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item> <h3>{product.name}</h3> </ListGroup.Item>
                <ListGroup.Item> <Rating value={product.rating} text={`${product.numReviews} reviews`} /> </ListGroup.Item>
                <ListGroup.Item> Price: ${product.price} </ListGroup.Item>
                <ListGroup.Item> Description: {product.description} </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col><strong>${product.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col><strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong></Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Select value={quantity} onChange={handleQuantityChange} size='sm'>
                            {[...Array(product.countInStock).keys()].map(count => (
                              <option key={count + 1} value={count + 1}>{count + 1}</option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button className='btn-block' type='button' onClick={handleAddToCart} disabled={product.countInStock === 0}>Add to cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}

    </>
  );
};

export default ProductScreen;
