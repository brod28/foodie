import React, { Component } from 'react';
import Reviews4andMore from './Reviews4andMore/Reviews4andMore';
import Articles4andMore from './Articles4andMore/Articles4andMore'
import PhotosandMore from './PhotosandMore/PhotosandMore'
import Reviews from './Reviews/Reviews'
import HeaderForPopup from '../Header/HeaderForPopup'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Restaurant extends Component {
  loading = true;
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {}

    }
  }

  componentDidMount() {
    /*
        fetch('/api/reviews?name=' + this.props.name)
          .then(res => res.json())
          .then(restaurant => {
            let reviews = [];
            let articles = [];
            let photos = [];
            let id_counter = 0;
            restaurant.reviews.forEach(function (element) {
              id_counter++;
              element.inner_id = id_counter;
              if (!element.review_article) {
                reviews.push(element);
                element.reviews.forEach(function (review) {
                  id_counter++;
                  review.inner_id = id_counter;
                })
              }
              else if (!element.photos) {
                id_counter++;
                element.photos.inner_id = id_counter;
                photos.push(element);
              }
              else {
                id_counter++;
                element.review_article.inner_id = id_counter;
                articles.push(element);
              }
            });
            this.setState({
              restaurant: restaurant,
              reviews: reviews,
              articles: articles,
              photos: photos
            });
          }
          );
    */
    let reviews = [];
    let articles = [];
    let photos = [];
    let id_counter = 0;
    restaurant.reviews.forEach(function (element) {
      id_counter++;
      element.inner_id = id_counter;
      if (element.review_article) {
        id_counter++;
        element.review_article.inner_id = id_counter;
        articles.push(element);
      }
      else if (element.photos) {
        id_counter++;
        element.photos.inner_id = id_counter;
        photos.push(element);
      }
      else {
        element.reviews.forEach(function (review) {
          id_counter++;
          review.inner_id = id_counter;
        })
        reviews.push(element);
      }
    });
    this.setState({
      restaurant: restaurant,
      reviews: reviews,
      articles: articles,
      photos: photos
    });


  }



  render() {
    let restaurantName = <p>Loading restaurant information... </p>;
    if (this.state.restaurant.metadata) {
      restaurantName = <HeaderForPopup name={this.state.restaurant.metadata.name} />;
    }
    let reviews4andMore = <p>Loading reviews... </p>;
    if (this.state.reviews) {

      reviews4andMore = <Reviews4andMore reviews={this.state.reviews} />
    }
    let articles4andMore = <p>Loading articles... </p>;
    if (this.state.articles) {
      articles4andMore = <Articles4andMore articles={this.state.articles} />
    }
    let photosandMore = <p>Loading photos... </p>;
    if (this.state.photos) {
      photosandMore = <PhotosandMore photos={this.state.photos} />
    }

    return (
      <div className="popup">
        <div className="restaurant">
          {restaurantName}
          <Route path="/restaurant/:name" render={({ match }) => (
            reviews4andMore
          )} />
          <Route path="/restaurant/:name" render={({ match }) => (
            articles4andMore
          )} />
          <Route path="/restaurant/:name" render={({ match }) => (
            photosandMore
          )} />

        </div>
      </div>
    );
  }
}

export default Restaurant;


var restaurant = { "metadata": { "google_id": "ChIJ-4xJz7AcdkgRt0jZLI7DAEU", "address": "56A Shoreditch High St, London E1 6PQ, UK", "name": "Pizza East", "phone_number": "020 7729 1888", "area_near": "56A Shoreditch High Street, London", "description": "Pizza East, Shoreditch High Street, London, United Kingdom", "website": "http://www.pizzaeast.com/", "location": { "lat": 51.5238239, "lng": -0.07689069999999999 } }, "reviews": [{ "rating": 4.1, "number_of_reviews": "N/A", "source": "google", "reviews": [{ "rating": 5, "time": "a week ago", "text": "Great pizzas for a decent price. The vibe is really good too, very casual. I was vegan and the time and was able to easily choose from various options. Also, they serve their red wine in a tumbler, which I love." }, { "rating": 5, "time": "3 weeks ago", "text": "We visited mid week at around 7pm. Wine was delicious. The food was on point and arrived within good time. A little crowded in the evening, but the vibe was good. Prices were reasonable for the fresh quality of food." }, { "rating": 1, "time": "3 months ago", "text": "Having been a regular customer at Pizza East since it opened, I feel obliged to write a review. As it really has upset me that both the service and the management last Monday were a huge disappointment. Working around the corner, Pizza East has been the base for many meetings, staff training and celebrations. Therefore, when a close friend was leaving the country for good, we thought Pizza East would make the perfect send-off location. We couldn’t have been more wrong. Firstly, the waitress had terrible attitude, unapproachable and considering we were a group of adults celebrating she was not the person to be our host. Secondly, we specifically chose to dine on a Monday at Pizza East to receive the 50% off, using the Pizza East keyring. However, because we were a group of 9 rather than a group of 8 they would not honour that, even though we never knew this was an issue. You would assume that management would be able to make an executive decision and keep 9 happy customers, rather than having a black cloud of dissatisfaction post meal. Otherwise, we would have made a booking on another day of the week outside of the discount day. However, now we know not to return to Pizza East, as there is no customer loyalty in this restaurant or any form of understanding. Which has forced me to write a review, as I feel it is necessary for them to understand that having a customer who has been to your restaurant for years, is shocked by the service and communication we received on Monday. Luckily Pizza Pilgrims has opened seconds down the road." }, { "rating": 5, "time": "2 weeks ago", "text": "Totally delicious food and drinks, efficient and attentive service. It's not cheap but you get what you pay for- it's very high quality. I recommend anything that comes with burrata" }, { "rating": 4, "time": "2 months ago", "text": "Had A pleasant surprise tonight when my girlfriend was not satisfied with her pizza(more a personal taste thing, expecting something else. Quality was not the issue) and the waiter immediately had the pizza redacted from our bill without us saying a word. Great service even though it was very full on a Friday night.\nMy pizza was delicious!" }] }, { "rating": "4.3", "number_of_reviews": "281", "source": "zomato", "zomato_id": "6104609", "reviews": [{ "rating": 4.5, "time": "3 months ago", "text": "Great place to eat it was busy on Monday because they have a half price offer on food with a fob. Get the fob. The pizza was really good and..." }, { "rating": 5, "time": "5 months ago", "text": "One of my best meals in London!  Even after screwing up the mocktail I'd asked for, they gladly changed it and brought something better on t..." }, { "rating": 4.5, "time": "5 months ago", "text": "The place is really nice and beautiful and the food especially the pizzas are extremely tasty!   However is usually too full if you don't ha..." }, { "rating": 5, "time": "5 months ago", "text": "Amazing pizzas! The crust is light and airy, delicious passion fruit and vodka cocktail, really really nice decor and setting, would love to..." }, { "rating": 4, "time": "8 months ago", "text": "I visited Pizza East with the Eating London Food Tour to try their famous salted caramel chocolate tart. I didn't enjoy it as much as expect..." }] }, { "rating": 4.4, "number_of_reviews": 501, "source": "facebook", "facebook_id": "1813879718845438", "reviews": [] }, { "source": "instagram", "instagram_id": "1813879718845438", "reviews": [], "photos": { "url": "https://www.instagram.com/explore/locations/1813879718845438/" } }, { "rating": "4", "number_of_reviews": "1175", "source": "www.tripadvisor.com", "id": 0, "reviews": [] }, { "rating": "4.4", "source": "www.opentable.com", "id": 0, "reviews": [] }, { "rating": "3.1", "source": "www.timeout.com", "id": 0, "reviews": [] }, { "rating": 3.5, "number_of_reviews": 223, "source": "yelp", "yelp_id": "pizza-east-london", "reviews": [{ "rating": 4, "time": "2017-09-15 01:24:09", "text": "This is a very nice Pizzeria in the heart of Shoreditch.\nThe quality of the food is high. We started sharing delicious lamb meatball then we had one salami..." }, { "rating": 3, "time": "2017-10-18 07:16:13", "text": "Had dinner here on a Monday night (50% night) & must declare an interest inasmuch as my mate is on good terms with the staff therefore any waiting around or..." }, { "rating": 1, "time": "2017-08-12 07:44:46", "text": "By far the worst dining experience in many many years.\n\nNegatives\n- The bar area to wait while your table is ready is chaotic and slow. Maybe the concept is..." }] }] }