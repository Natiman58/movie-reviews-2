import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies.js";
import { Link } from "react-router-dom";
import {Form, Button, Col, Row, Container, Card} from "react-bootstrap";


const MoviesList = (props) => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    // To get the next page
    const [currentPage, setCurrentPage] = useState(0);
    const [enteriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");

    useEffect(() => {
        setCurrentPage(0)
    }, [currentSearchMode])

    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    },[])

    useEffect(() => {
        //retrieveMovies()
        retrieveNextPage()
    }, [currentPage])

    const retrieveNextPage = () => {
        if(currentSearchMode === "findByTitle")
            findByTitle()
        else if(currentSearchMode === "findByRating")
            findByRating()
        else
            retrieveMovies()
    };

    const retrieveMovies = () => {
        setCurrentSearchMode("")
        MovieDataService.getAll(currentPage)
        .then(response => {
            setMovies(response.data.movies)
            setCurrentPage(response.data.page)
            setEntriesPerPage(response.data.entries_per_page)
        })
        .catch(e => {
            console.log(e);
        })
    };

    const retrieveRatings = () => {
        MovieDataService.getRatings()
        .then(response => {
            console.log(response.data)
            setRatings(["All Ratings"].concat(response.data))
        })
        .catch(e => {
            console.log(e)
        })
    };

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle);
    };

    const onChangeSearchRating = e => {
        const searchRating = e.target.value
        setSearchRating(searchRating);
    };

    const find = (query, by) => {
        MovieDataService.find(query, by, currentPage)
        .then(response => {
            console.log(response.data)
            setMovies(response.data.movies)
        })
        .catch(e => {
            console.log(e)
        });
    };

    const findByTitle = () => {
        setCurrentSearchMode("findByTitle")
        find(searchTitle, 'title')
    };

    const findByRating = () => {
        setCurrentSearchMode("findByRating")
        if(searchRating === "All Ratings"){
            retrieveMovies()
        } else {
            find(searchRating, "rated")
        }
    };

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle}
                                    style={{
                                            width: '300px',
                                            margin: '15px'
                                            }}
                                />
                            </Form.Group>
                            <Button
                                    variant="primary"
                                    type="button"
                                    onClick={findByTitle}
                                    style={{margin: '5px 15px'}}
                            >
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select" onChange={onChangeSearchRating}
                                    style={{
                                        width: '300px',
                                        margin: '15px'
                                        }}
                                >
                                    {ratings.map(rating => {
                                        return (
                                            <option value={rating}>{rating}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByRating}
                                style={{
                                        margin: '5px 15px'
                                        }}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    {movies.map((movie) => {
                        return(
                            <Col>
                                <Card style={{ width: "18rem"}}>
                                    <Card.Img src={movie.poster+"/100px180"} />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>Rating: {movie.title}</Card.Text>
                                        <Card.Text>{movie.plot}</Card.Text>
                                        <Link to={"/movies/"+movie._id}>View Reviews</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                <br/>
                Showing page: {currentPage}.
                <Button
                    variant="link"
                    onClick={() => {setCurrentPage(currentPage + 1)}}
                >Get next {enteriesPerPage} results</Button>
            </Container>
        </div>
    );

};

export default MoviesList;