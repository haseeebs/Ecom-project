import { Col, Row } from 'react-bootstrap'
import Products from '../components/Products.jsx'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'
import Loader from '../components/Loader'
import Message from '../components/Message.jsx'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate.jsx'
import ProductCarousel from '../components/ProductCarousel.jsx'

const HomeScreen = () => {
    const { pageNumber, searchedKeyword } = useParams();

    const { data, isLoading, error } = useGetProductsQuery({ pageNumber, searchedKeyword });

    if (isLoading) return <Loader />

    if (error) return <Message variant='danger'>Error occurred while fetching products {error?.data?.message || error.error}</Message>

    return (
        <>
            {
                !searchedKeyword
                    ? <ProductCarousel />
                    : <Link to={'/'} className='btn btn-light mb-2'>Go back</Link>

            }

            <Row>
                <h1>Latest Products</h1>

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