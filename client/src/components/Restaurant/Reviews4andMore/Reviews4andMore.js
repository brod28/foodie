import React, { Component } from 'react';
import Reviews from '../Reviews/Reviews'
import HeaderForPopup from '../../Header/HeaderForPopup'

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
      reviews: this.props.reviews.slice(0, 4),
      andmore: false
    }
  }
  render() {
    let _this = this;
    let add_more = () => {
      _this.setState({
        number_of_more: this.props.reviews.length - 4,
        reviews: this.props.reviews,
        andmore: true
      });
    }
    let remove_more = () => {
      _this.setState({
        number_of_more: this.props.reviews.length - 4,
        reviews: this.props.reviews.slice(0, 4),
        andmore: false
      });
    }
    let fullClass = '';
    if (this.state.andmore) {
      fullClass = 'popup';
    }
    return (
      <div className={fullClass}>
        <div id="reviews_ancor" className="reviews_4_and_more">
          {this.state.reviews.map(review =>
          <div>
            <ul className="reviews_per_platfrom">
              <li>
                <StarsForReview number_of_stars={review.rating} />
              </li>
              <li>
                <img src={require('../../../images/logos/'+review.source.replace('www.','').replace('.com','')+'_logo.png')} />
              </li>
              </ul>
              <div>
                {review.reviews.length > 0 ?
                  (<Link to={window.location.pathname + '/read_reviews/' + review.inner_id}>
                    read the reviews
                  </Link>)
                  :
                  ('')}
              </div>
              </div>
          )}
          {this.state.number_of_more > 0 ?
            <div className="and_more">
              {!this.state.andmore ?

                <p>
                  <div className="clickable" onClick={add_more}>
                    <strong> another {this.state.number_of_more} ratings  >>> </strong>
                  </div>
                </p>
                :
                <HeaderForPopup name="Reviews by :TODO" back={remove_more} />

              }
            </div>
            :
            ''
          }

          <Route path="*/read_reviews/:review_platfrom_inner_id" render={({ match }) => (
            <Reviews reviews={this.state.reviews} review_platfrom_inner_id={match.params.review_platfrom_inner_id} />
          )} />

        </div>
      </div>

    )
  }
}
export default Reviews4andMore;

class StarsForReview extends Component {
  constructor(props) {
    super(props);

    let number_of_stars;
    try{
      number_of_stars = parseFloat(this.props.number_of_stars) + 0.5
    }
    catch(e){
      console.log(e.message + e.stack) 
    }
    
    this.state = {
      number_of_stars: number_of_stars
    }
  }
  render() {
    let starts = [];
    if(this.state.number_of_stars){
      for (let i = 1; i < 6; i++) {
        starts.push(this.state.number_of_stars >= i ?
          <img src={require('../../../images/star.svg')} />
          :
          <img src={require('../../../images/star_empty.svg')} />);
      }
    }
    else{
      starts.push(
        <img src={require('../../../images/no_rating.png')} />);      
    }
    return (
    <div class="review_stars">
      {starts.map(star =>
        star
      )}
    </div>)

  }
}