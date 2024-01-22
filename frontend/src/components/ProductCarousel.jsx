import { useGetTopRatedProductsQuery } from '../slices/productsApiSlice'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from './Message'
import Loader from './Loader'


const ProductCarousel = () => {

    const { data: products, isLoading, error } = useGetTopRatedProductsQuery();

    return isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-primary mb-4'>

            {products.map(product => (

                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`}>

                        <Image src={product.image} alt={product.name} className='carousel-image' fluid />
                        <Image src={product.image} alt={product.name} className='carousel-image' fluid />

                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} ${product.price}</h2>
                        </Carousel.Caption>

                    </Link>
                </Carousel.Item>

            ))}

        </Carousel>
    )
}

export default ProductCarousel