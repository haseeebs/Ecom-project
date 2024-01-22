import { Col, Row } from 'react-bootstrap'
import Products from '../components/Products.jsx'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'
import Loader from '../components/Loader'
import Message from '../components/Message.jsx'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate.jsx'

const HomeScreen = () => {
    const { pageNumber, searchedKeyword } = useParams();

    const { data, isLoading, error } = useGetProductsQuery({ pageNumber, searchedKeyword });

    if (isLoading) return <Loader />

    if (error) return <Message variant='danger'>Error occurred while fetching products {error?.data?.message || error.error}</Message>

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {data.products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Products product={product} />
                    </Col>
                ))}
            </Row>
            <Paginate
                pageNumber={data.pageNumber}
                pages={data.pages}
                searchedKeyword={searchedKeyword ? searchedKeyword : ''}
            />
        </>
    )
}

export default HomeScreen