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
        andmore:false
      }
    }
    render() {
      let _this=this;
      let add_more=()=>{
        _this.setState({
          number_of_more: this.props.reviews.length - 4,
          reviews: this.props.reviews,
          andmore:true
        });
      }
      let remove_more=()=>{
        _this.setState({
          number_of_more: this.props.reviews.length - 4,
          reviews: this.props.reviews.slice(0, 4),
          andmore:false
        });
      }
      let fullClass='';
      if(this.state.andmore){
        fullClass='popup';
      }
        return (
          <div className={fullClass}>
        <div id="reviews_ancor" className="reviews_4_and_more">
          {this.state.reviews.map(review =>
            <div className="reviews_4">
              <p>
                rating {review.rating} out of 5 number of reviews {review.number_of_reviews} <strong>  provided by {review.source} </strong>
              </p>
              <p>
              {review.reviews.length>0?
                (<Link to={window.location.pathname+'/read_reviews/' + review.inner_id}>
                read reviews from {review.source}
              </Link>)
                :
                ('')}
                
              </p>
            </div>
          )}
          {this.state.number_of_more>0?
          <div className="and_more">
            {!this.state.andmore?
              
              <p>
              <div className="clickable" onClick={add_more}>
                <strong> another {this.state.number_of_more} ratings  >>> </strong> 
              </div>
            </p>
              :
              <HeaderForPopup name="Reviews by :TODO" back={remove_more}/>
              
               }
            </div>
              :
              ''
            }
            
            <Route path="*/read_reviews/:review_platfrom_inner_id" render={({match})=>(
              <Reviews reviews={this.state.reviews} review_platfrom_inner_id={match.params.review_platfrom_inner_id} />
            )}/>

          </div>
          </div>
          
      )
    }
  }
  export default Reviews4andMore;
  