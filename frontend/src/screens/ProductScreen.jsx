import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useCreateProductReviewMutation, useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';

const ProductScreen = () => {
  // Hooks and state initialization
  const { id: productId } = useParams();

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const [createProductReview, { isLoading: loadingCreateReview }] = useCreateProductReviewMutation();

  const { userInfo } = useSelector(store => store.auth);

  // Event handler for quantity change
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value))
  }

  // Event handler for adding to cart
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/cart');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createProductReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review submitted');
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
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

          <Row className='reviews'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}

              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write A Customer Review</h2>

                  {loadingCreateReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId='rating' className='my-2'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={event => setRating(Number(event.target.value))}
                        >
                          <option value=''>Select rating</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='comment' className='my-2'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows='3'
                          value={comment}
                          onChange={event => setComment(event.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button type='submit' variant='primary' disabled={loadingCreateReview}>Submit</Button>
                    </Form>
                  ) : (
                    <Message>Please<Link to={'/login'}> sign in </Link>to write a review</Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}

    </>
  );
};

export default ProductScreen;
