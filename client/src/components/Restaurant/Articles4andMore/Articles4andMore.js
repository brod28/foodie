import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Articles4andMore extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        number_of_more: this.props.articles.length - 4,
        review_article: this.props.articles.slice(0, 4)
      }
    }
  
    render() {
      let and_more = "";
      if (this.state.number_of_more > 0) {
        and_more = <div className="and_more">
          <p>
            <Link to={'articles/'}>
              see more {this.state.number_of_more} platform ratings
          </Link>
          </p>
        </div>;
      }
  
  
      return (
        <div className="articles_4_and_more">
          {this.state.review_article.map(article =>
            <div className="articles_4">
              <p>
                article is provided by {article.source}
              </p>
              <p>
                <Link to={'aas'}>
                  read the article
            </Link>
              </p>
            </div>
          )}
          {and_more}
        </div>
      )
    }
  }

  
  export default Articles4andMore;
  