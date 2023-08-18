import React, { useState } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams, useLocation } from "react-router-dom";
import {Form, Button} from "react-bootstrap"

const AddReview = props => {
    let editing = false;
    let initialReviewState = ""
    const {id} = useParams()
    const location = useLocation();
    const currentReview = location.state?.currentReview;

    //if (location.state && location.state.currentReview) {
    //    editing = true;
    //    initialReviewState = location.state.currentReview.review;
    //}
    //console.log(location)
    console.log(currentReview)


    const [review, setReview] = useState(initialReviewState)
    //keeps track if review is submitted
    const [submitted, setSubmitted] = useState(false)

    const onChangeReview = e => {
        const review = e.target.value
        setReview(review);
    };

    const saveReview = () => {
        var data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: id
        };
        if(editing){
            data.review_id = props.location.state.currentReview._id
            MovieDataService.updateReview(data)
            .then(response => {
                setSubmitted(true);
                console.log(response.data)
            })
            .catch(e=>{console.log(e)
            })
        } else {

            MovieDataService.createReview(data)
            .then(response => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {console.log(e)});
        }
    };

    return(
        <div>
            {submitted ? (
                <div>
                    <h4>Review submitted successfully</h4>
                    <Link to={"/movies/"+`${id}`}>Back to Movie</Link>
                </div>
            ):(
                <Form>
                    <Form.Group>
                        <Form.Label>{editing ? "Edit": "Create"}Review</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={review}
                            onChange={onChangeReview}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={saveReview}>Submit</Button>
                </Form>
            )}
        </div>
    );
};

export default AddReview;