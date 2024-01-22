import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

const SearchBox = () => {

    const navigate = useNavigate();
    const { searchedKeyword: urlSearchedKeyword } = useParams();

    const [searchedKeyword, setSearchedKeyword] = useState(urlSearchedKeyword || '');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (searchedKeyword.trim()) {
            navigate(`/search/${searchedKeyword}`)
        } else {
            navigate(`/`)
        }
        setSearchedKeyword('');
    }

    return (
        <Form onSubmit={handleSubmit} className="d-flex">

            <Form.Control
                type="text"
                name="query"
                placeholder="Search Products..."
                value={searchedKeyword}
                onChange={event => setSearchedKeyword(event.target.value)}
                className="mr-sm-2 ml-sm-5"
            >
            </Form.Control>

            <Button type="submit" variant="outline-light" className="p-2 mx-2">Search</Button>
        </Form>
    )
}

export default SearchBox