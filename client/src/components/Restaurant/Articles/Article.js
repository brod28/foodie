import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class Reviews extends Component {
    constructor(props) {
        super(props);
        let reviews=[];
        let review_platfrom_inner_id=this.props.review_platfrom_inner_id;
        this.props.reviews.forEach(function(element) {
            if(element.inner_id==review_platfrom_inner_id){
                reviews=element.reviews;
            }    
        });
        this.state = {
            reviews: reviews
        }
    }
    componentDidMount() {
    }

    render() {
        return (
            (
                this.state.reviews.length>1 ?
                <div className="reviews">
                    {this.state.reviews.map(review =>
                        <div>
                            <p>
                                {review.text}
                            </p>
                            <p>
                             {review.rating} of 5
                            </p>
                            <p>
                                {review.time}
                            </p>
                        </div>
                    )}
                </div>
                :
                <div>
                    Loading reviews ...
                </div>
            )
        )
    }
}
export default Reviews;
