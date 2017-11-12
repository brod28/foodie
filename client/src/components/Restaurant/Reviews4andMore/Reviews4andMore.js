import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Reviews4andMore extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        number_of_more: this.props.reviews.length - 4,
        reviews: this.props.reviews.slice(0, 4)
      }
    }
  
    render() {
      return (
        <div className="reviews_4_and_more">
          {this.state.reviews.map(review =>
            <div className="reviews_4">
              <p>
                rating {review.rating} out of 5 number of reviews {review.number_of_reviews} provided by {review.source}
              </p>
              <p>
              {review.reviews.length>0?
                (<Link to={window.location.pathname+'/read_reviews/' + review.inner_id}>
                read the reviews
              </Link>)
                :
                ('')}
                
              </p>
            </div>
          )}
          <div className="and_more">
            <p>
              <Link to={'reviews/'}>
                see more {this.state.number_of_more} platform ratings
              </Link>
            </p>
          </div>
        </div>
      )
    }
  }
  export default Reviews4andMore;
  