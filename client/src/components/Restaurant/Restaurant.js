import React, { Component } from 'react';
import Reviews4andMore from './Reviews4andMore/Reviews4andMore';
import Articles4andMore from './Articles4andMore/Articles4andMore'
import PhotosandMore from './PhotosandMore/PhotosandMore'
import Reviews from './Reviews/Reviews'
import HeaderForPopup from '../Header/HeaderForPopup'
import Menus from './Menus/Menus'
import CountDown from '../Helpers/CountDown'
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
    fetch('/api/reviews?name=' + this.props.name)
      .then(res => 
        res.json())
      .then(restaurant => {
        this.setState(this.getStateObject(restaurant));
      });
    /*
    this.setState(this.getStateObject(restaurant));
    */
  }

  getStateObject = function (restaurant) {
    let reviews_with_reviews = [];
    let reviews = [];
    let articles = [];
    let photos = [];
    let menus = [];
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
      else if (element.menu) {
        id_counter++;
        element.menu.inner_id = id_counter;
        menus.push(element);
      }
      else {
        let has_reviews = false;
        element.reviews.forEach(function (review) {
          id_counter++;
          review.inner_id = id_counter;
          has_reviews = true;
        })
        if (has_reviews) {
          reviews_with_reviews.push(element);
        }
        else {
          reviews.push(element);
        }
      }
    });

    return {
      restaurant: restaurant,
      reviews: reviews_with_reviews.concat(reviews),
      articles: articles,
      photos: photos,
      menus: menus
    };
  }



  render() {
    let restaurantName = <div><p>Loading restaurant information... </p><CountDown/></div>;
    if (this.state.restaurant.metadata) {
      restaurantName = 
      <nav class="navbar navbar-inverse navbar-fixed-top">
      {this.state.restaurant.metadata.name}
      <ul class="nav navbar-nav">
        <li><a href="#section1">Reviews</a></li>
      </ul>
      <ul class="nav navbar-nav">
        <li><a href="#section2">Articles</a></li>
      </ul>
      <ul class="nav navbar-nav">
        <li><a href="#section3">Photos</a></li>
      </ul>
      <ul class="nav navbar-nav">
        <li><a href="#section4">Menu</a></li>
      </ul>
    </nav>
      
      
      
    //  <HeaderForPopup name={this.state.restaurant.metadata.name} url={this.state.restaurant.metadata.website} />;
    }
    let reviews4andMore =   <p>Loading reviews... </p>
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
    let menus = <p>Loading menus... </p>;
    if (this.state.menus) {
      menus = <Menus menus={this.state.menus} />
    }



    return (
      <div className="popup">
        <div className="restaurant">
            {restaurantName}
          <Route path="/restaurant/:name" render={({ match }) => (
            <div id="section1">
              {reviews4andMore}
            </div>
          )} />
          <Route path="/restaurant/:name" render={({ match }) => (
            <div id="section2">
            {articles4andMore}
            </div>
          )} />
          <Route path="/restaurant/:name" render={({ match }) => (
            <div id="section3">
                {photosandMore}
            </div>
          )} />
          <Route path="/restaurant/:name" render={({ match }) => (
            <div id="section4">
            {menus}
          </div>
          
          )} />

        </div>
      </div>
    );
  }
}

export default Restaurant;




var restaurant = {"metadata":{"google_id":"ChIJ37AHt9MEdkgRDVY9ZuyydVA","address":"34 Rupert St, Soho, London W1D 6DN, UK","name":"The Palomar","phone_number":"020 7439 8777","area_near":"34 Rupert Street, London","description":"The Palomar, Rupert Street, London, United Kingdom","website":"http://thepalomar.co.uk/","location":{"lat":51.511214,"lng":-0.132733}},"reviews":[{"rating":4.6,"number_of_reviews":"N/A","source":"google","reviews":[{"rating":1,"time":"a week ago","text":"Called months ago to make a reservation since we are not from London and wanted to eat here for my husband's birthday.  I  was told to wait until 60 days. I emailed promptly 60 days prior (at 10:00 a.m.) since the site would not let me book and was told they were fully booked. They gave me a list of other restaurants to eat at. Disappointing attitude.  Will surely eat where my business is welcome and appreciated."},{"rating":5,"time":"in the last week","text":"Great food. Good vibe. The layout of the kitchen area does a good job of connecting you to the chefs and your food. Pricey, but as expected."},{"rating":5,"time":"a week ago","text":"Brilliant night sitting at the bar/kitchen top. Food is delicious and the head chef is very loud, energetic and entertaining - dont go there for a calming experience! \nWaited for 2h to get in but the guy managing the list was very good at updating us while we had a drink elsewhere - well worth the wait."},{"rating":3,"time":"3 months ago","text":"I liked the ambience in The Palomar. It's entertaining to eat at the bar watching cooks preparing your food. Service is quick and friendly. The place seems to be popular as there was a queue outside to get in at 10PM when we were leaving. The middle eastern food however was a mixed bag, some dishes were good, some not so. I liked the salads and octopus with chickpea mash. Jerusalem Mix was a bit of a hoax though, the plate full of fried onions and couple of pieces of chicken liver buried underneath it. £14.5 dish with no much food on the plate..."},{"rating":5,"time":"a month ago","text":"Great place to eat and nice friendly and very helpful staff. If don’t have a booking it’s worth the wait. Uncomfortable to seat and eat on a high chair around the bar but definitely worth the shot."}]},{"rating":"N/A","number_of_reviews":"N/A","source":"foursquare","foursquare_id":"537504a8498e1fe2c8c4fa71","menu":{"url":"http://thepalomar.co.uk/food/"}},{"rating":"N/A","number_of_reviews":"N/A","source":"foursquare","foursquare_id":"537504a8498e1fe2c8c4fa71","photos":{"photos":[{"url":"https://igx.4sqi.net/img/general/height250/21539_JWf7PHdj-eEivR33dHlx4Oxdk1umjmhPjIqNJerRHjE.jpg"},{"url":"https://igx.4sqi.net/img/general/height250/85624943_IOJYLMXsAg7vDroYyUmMHaxpu9k2--4zLww4FgQ0GNc.jpg"},{"url":"https://igx.4sqi.net/img/general/height250/70583159_n6sPWLy_3XA0rYK31Qm_COKpy6gHvpzCUxhroSOh9aI.jpg"},{"url":"https://igx.4sqi.net/img/general/height250/5091725_NMYU05HlqjHlUZGWJEqy-HUIjmIE90k7v76dXku1ZWk.jpg"},{"url":"https://igx.4sqi.net/img/general/height250/53607471_SF-hXjqNbvIMKKnZ7MjOmMfUpk8jUZq9_BH4iAAbVUQ.jpg"},{"url":"https://igx.4sqi.net/img/general/height250/597118_0sabyc7AdKW4QlC5x6BUGrgn_RS70wNdEiqLCX-vO10.jpg"},{"url":"https://igx.4sqi.net/img/general/height250/63216188_syspBWQ4ACc0TE7hbQREcTQ5ZfUUQblHa1ffdh89coQ.jpg"},{"url":"https://igx.4sqi.net/img/general/height250/63216188_WrMz5WN_fwTeGvv6TwB2Q7ytmF1Ug4ElnPKQvxrfZL0.jpg"}]}},{"rating":"N/A","number_of_reviews":"N/A","source":"foursquare","foursquare_id":"537504a8498e1fe2c8c4fa71","reviews":[{"time":1497082439,"text":"If you like an interesting take on middle eastern food and specialty cocktail/mocktails head here. Friendly service. Gets really crowded so reservations recommended.","photo_url":"https://igx.4sqi.net/img/general/height250/95579938_PZbCLwQeCHs3xdNKc7HlS0unbMhbcx62p5SfRU7tv_o.jpg"},{"time":1431757412,"text":"Very nice food and great for sharing but I suggest only getting one meat dish as they're very intensely flavoured and heavy","photo_url":"https://igx.4sqi.net/img/general/height250/319059_FwDSB6i7BI_clGnpxgjvdyFIYenuc6MfH_iHcmVuIbE.jpg"},{"time":1472163410,"text":"If you don't book, count a 1 or 1.5 hour wait. Polenta, octo-hummus and kubaneh were amazing. Jerusalem mess for dessert is a must!","photo_url":"https://igx.4sqi.net/img/general/height250/80757304_E5WPQWiyB22iyJFJsHtE5uOAasygWuyux24UZIqaYuI.jpg"},{"time":1413418288,"text":"We came on their opening Saturday and I was probably the best meal out we've ever had. Simply brilliant, buzzy and tasty","photo_url":"https://igx.4sqi.net/img/general/height250/96091016_Ltz90LMD_3Rr8hYxJ7NWTkc1c63MH9pBFWr_XIBsi_0.jpg"},{"time":1468788262,"text":"Just go and eat everything. It is packed but servers are super nice and very well versed in all the great eats.","photo_url":"https://igx.4sqi.net/img/general/height250/81374730_q9OIctqWAK1WgEJ5CauQZrC2uE7Pl72ocemdmondRu4.jpg"},{"time":1443380161,"text":"Amazing food, tried 10 menu  itens and all were tasty! The Cauliflower steak and Seared Scallops are to die for!","photo_url":"https://igx.4sqi.net/img/general/height250/139793839_IvxcKx8DpUZZlUaqtlgq6YU05ljJFZPX6PWosU2wp6E.jpg"}]},{"rating":4.8,"number_of_reviews":366,"source":"facebook","facebook_id":"215747375288497","reviews":[]},{"source":"instagram","instagram_id":"215747375288497","reviews":[],"photos":{"url":"https://www.instagram.com/explore/locations/215747375288497/"}},{"rating":"3","number_of_reviews":"N/A","source":"Time Out","tripexpert_id":292065,"reviews":[],"review_article":{"url":"http://www.timeout.com/london/restaurants/avalon","summary":"The Avalon gastropub opened in 2008, aimed squarely at the young, affluent couples swarming into the Balham area.","by":""}},{"number_of_reviews":"N/A","source":"Michelin Guide","tripexpert_id":253027,"reviews":[],"review_article":{"summary":"You'll find everything from a pie of the day and steaks to dishes of a more Mediterranean persuasion like w hole grilled bream with caponata or gnocchi with porcini mushrooms.","by":""}},{"number_of_reviews":"N/A","source":"Independent","tripexpert_id":267901,"reviews":[],"review_article":{"url":"http://www.independent.co.uk/life-style/food-and-drink/reviews/the-avalon-16-balham-hill-london-sw12-1606989.html","summary":"What do you want from your friendly neighbourhood gastropub? Striking the right balance between pub and gastro is a tricky business, like getting the correct proportions of gin and...","by":""}},{"rating":4.5,"number_of_reviews":63,"source":"yelp","yelp_id":"the-palomar-restaurant-london","reviews":[{"rating":5,"time":"2017-08-19 00:26:25","text":"The Palomar Restaurant was our last stop in during our trip in London, and it turned out to be the perfect choice. This is definitely one of those..."},{"rating":5,"time":"2017-07-23 08:37:51","text":"This is both one of the hottest and controversial Restos for middle eastern food. Barbary its slightly wallet friendlier sister resto seems to generate more..."},{"rating":5,"time":"2017-05-25 15:51:16","text":"Put my name down for two at 6:30pm and was seated at 7:10pm (they estimated 8pm). I waited outside but they took my number down in case I wanted to walk..."}]},{"rating":"4.8","number_of_reviews":"152","source":"zomato","zomato_id":"6122355","reviews":[{"rating":5,"time":"4 months ago","text":"Brilliant, bold flavors without any gimmicks. Rustic and hearty fare with a light touch. Desserts were divine. If this is what food tastes l..."},{"rating":3.5,"time":"6 months ago","text":"Lovely lunch at The Palomar. The food is good with some items better than others. The bread was the highlight of the meal but at £6 each I ..."},{"rating":5,"time":"7 months ago","text":"The best meal I've had in London, perhaps in the past year. Everything was amazing. My favorites were the beet carpaccio, octo-hummous, and ..."},{"rating":5,"time":"9 months ago","text":"Could not fault a thing with this place. I loved everything. I wish I could eat their burnt aubergine everyday. And the lamb... oh the lamb...."},{"rating":4.5,"time":"10 months ago","text":"Kubaneh bread is a must to order. The bread is very soft and full of smell and taste. Everything was well seasoned and delicious. Definitely..."}]},{"rating":"4.5","number_of_reviews":"1054","source":"www.tripadvisor.com","id":0,"reviews":[]},{"rating":"4.5","source":"www.timeout.com","id":0,"reviews":[]}]}