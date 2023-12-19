import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) :
        product ? (
          <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            <Row>

              <Col md={5}>
                <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} fluid />
              </Col>
              <Col md={4}>
                <ListGroup variant='flush'>
                  <ListGroup.Item> <h3>{product.name}</h3> </ListGroup.Item>
                  <ListGroup.Item> <Rating value={product.rating} text={`${product.numReviews} reviews`} /> </ListGroup.Item>
                  <ListGroup.Item> Price: {product.price} </ListGroup.Item>
                  <ListGroup.Item> Description: {product.description} </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col><strong>{product.price}</strong></Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col><strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong></Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add to cart</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>

            </Row>
          </>
        ) : (
          <p>Product not found</p>
        )}
    </div>
  );
};

export default ProductScreen;
