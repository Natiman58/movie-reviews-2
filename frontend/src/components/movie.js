import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams } from "react-router-dom";
import { Card, Container, Image, Col, Row, Button } from "react-bootstrap";
import Media from "react-bootstrap/Media";
import moment from "moment";

const Movie = (props) => {
    const { id } = useParams(); // Access route parameter
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: [],
    });

    const getMovie = (id) => {
        MovieDataService.get(id)
            .then((response) => {
                setMovie(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id) {
            getMovie(id);
        }
    }, [id]);

    const deleteReview = (reviewId, index) => {
        MovieDataService.deleteReview(reviewId, props.user.id)
        .then(response => {
            setMovie((currState) => {
                currState.reviews.splice(index, 1)
                return({
                    ...currState
                })
            })
        })
        .catch(e => {
            console.log(e)
        });
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "/100*250"} />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{movie.plot}</Card.Text>
                                {props.user && (
                                    <Link to={`/movies/${id}/review`}>
                                        Add Review
                                    </Link>
                                )}
                            </Card.Body>
                        </Card>
                        <br />
                        <h2 style={{
                                    "font-size": "2rem",
                                    "position": "relative",
                                    "left": "22%",
                                    "width": "8rem",
                                }} >Reviews</h2>
                        {movie.reviews.map((review, index) => {
                            console.log(review, index)
                            return (
                                <Media key={index}>
                                    <Media.Body>
                                        <h5>
                                            {review.name + " reviewed on"}{" "}
                                            {moment(review.date).format(
                                                "Do MMMM YYYY"
                                            )}
                                        </h5>
                                        <p>{review.review}</p>
                                        {props.user && props.user.id === review.user_id && (
                                            <Row>
                                                <Col>
                                                    <Link
                                                        to={{
                                                            pathname:"/movies/" + `${id}` + "/review",
                                                            state: {
                                                                currentReview: review,
                                                            },
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="link" onClick={() => deleteReview(review._id, index)}>
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )}
                                    </Media.Body>
                                </Media>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Movie;
