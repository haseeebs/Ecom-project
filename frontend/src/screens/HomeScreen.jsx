import { Col, Row } from 'react-bootstrap'
import Products from '../components/Products.jsx'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'

const HomeScreen = () => {

    const { data: products, isLoading, error } = useGetProductsQuery();

    if (isLoading) return <h2>Loading...</h2>
    if (error) return <div>Error occurred while fetching products {error?.data?.message || error.error}</div>

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Products product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen