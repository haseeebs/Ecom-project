import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from "../../slices/productsApiSlice";
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const ProductListScreen = () => {

    const { data: products, isLoading, refetch, error } = useGetProductsQuery();

    const [createProduct, { isLoading: loadingCreateProduct }] = useCreateProductMutation();

    const [deleteProduct, { isLoading: loadingDeleteProduct }] = useDeleteProductMutation();

    const handleCreateProduct = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete the product?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted successfully')
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col> <h1>Products</h1> </Col>

                <Col className='text-end'>

                    <Button className='btn-sm m-3' onClick={handleCreateProduct}>
                        <FaEdit /> Create new product
                    </Button>

                </Col>
            </Row>

            {loadingCreateProduct && <Loader />}

            {loadingDeleteProduct && <Loader />}

            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

                <>
                    <Table striped hover responsive className='table-sm'>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'> <FaEdit /> </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => handleDelete(product._id)}> <FaTrash style={{ color: 'white' }} /> </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </>

            )}
        </>
    )
}

export default ProductListScreen