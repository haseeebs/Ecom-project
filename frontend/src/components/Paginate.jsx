import { Pagination } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"


const Paginate = ({ pageNumber, pages, isAdmin = false, searchedKeyword}) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map(page => (
                    <LinkContainer key={page + 1} to={!isAdmin ? searchedKeyword 
                    ? `/search/${searchedKeyword}/page/${page + 1}` 
                    : `/page/${page + 1}` 
                    : `/admin/productlist/${page + 1}`}>

                        <Pagination.Item active={page + 1 === pageNumber}>{page + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate