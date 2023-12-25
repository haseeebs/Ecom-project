import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

const ProductScreen = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {isLoading && <h2>Loading...</h2>}

      {error && <div>{error?.data?.message || error.error}</div>}

      {product && (
        <>
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
      )}

      {!product && !isLoading && <p>Product not found</p>}
    </>
  );
};

export default ProductScreen;