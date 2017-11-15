import React, { Component } from 'react';
import Reviews4andMore from './Reviews4andMore/Reviews4andMore';
import Articles4andMore from './Articles4andMore/Articles4andMore'
import PhotosandMore from './PhotosandMore/PhotosandMore'
import Reviews from './Reviews/Reviews'
import HeaderForPopup from '../Header/HeaderForPopup'
import Menus from './Menus/Menus'

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
          .then(res => res.json())
          .then(restaurant => {
            let reviews = [];
            let articles = [];
            let photos = [];
            let menus=[];
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
              photos: photos,
              menus:menus
            });
          }
          );
    /*
   let reviews = [];
            let articles = [];
            let photos = [];
            let menus=[];
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
              photos: photos,
              menus:menus
            });
            */

  }



  render() {
    let restaurantName = <p>Loading restaurant information... </p>;
    if (this.state.restaurant.metadata) {
      restaurantName = <HeaderForPopup name={this.state.restaurant.metadata.name} url={this.state.restaurant.metadata.website}/>;
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
    let menus = <p>Loading menus... </p>;
    if (this.state.menus) {
      menus = <Menus menus={this.state.menus} />
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
          <Route path="/restaurant/:name" render={({ match }) => (
            menus
          )} />

        </div>
      </div>
    );
  }
}

export default Restaurant;


var restaurant = {"metadata":{"google_id":"ChIJEWbXz6ZZwokRLKmKrtPfVFY","address":"11 Madison Ave, New York, NY 10010, USA","name":"Eleven Madison Park","phone_number":"(212) 889-0905","area_near":"11 Madison Avenue, New York","description":"Eleven Madison Park, Madison Avenue, New York, NY, United States","website":"https://www.elevenmadisonpark.com/","location":{"lat":40.7415114,"lng":-73.9869677}},"reviews":[{"rating":4.6,"number_of_reviews":"N/A","source":"google","reviews":[{"rating":5,"time":"a week ago","text":"Went here for a work lunch and while the name has quite a reputation, I wanted to go in with an open mind to see for myself if this place can satisfy every palate. \nI should preface the review saying this: it did.\nWe started with a salad that offered the perfect amount of crunch to smooth, sweet to sour, fruit to vegetable. We had a baked sweet corn grit that was beyond perfect. The crisp layer of carmelization on the top was to die for. \nFor dessert, we had a chocolate sculpture who's name I don't remember. Imagine decadent chocolate perfectly formed into a rectangle box. Open the box and find a chocolate cake. A unique design that was so rich I'm glad to have shared it among 4 people. Melted in your mouth.\nSurprisingly, the price wasn't too expensive compared to other restaurants in NYC that aren't even on the same scale as this.\nI'd go back for apps or drinks some night just to get another fill"},{"rating":5,"time":"4 weeks ago","text":"I came here with three friends to celebrate our summer birthdays. As tasting menus go, this one I would say was more inventive and followed a distinct theme of summer in New York. It brought to life the districts, the people, the food/ ingredients and the summer activities. A lot of people have spoken about the food, I will only add that it was as wonderful as they all say. I think for me, the finishing touches stood out the most, the slightly dented plates for the picnic in central park, and the little grill that comes to the table to grill the peaches for dessert. The staff were very accommodating with tastes and palates, we had 2 vegetarians and a pescetarian in the party, with very different approaches to cocktails and menu items. \n\nOverall, a great experience, I would definitely recommend doing the tasting menu here."},{"rating":3,"time":"3 months ago","text":"I loved and hated it all at once. Most of the food was delicious, but portions were very small for my taste. Presentation and flavors were excellent. Original and classic drinks. Pear dessert tasted canned. Overall for the steep price and 5 stars everything must be a home run, this place was a double at best on this trip."},{"rating":5,"time":"a week ago","text":"There is a good reason it's #1 in the world. Chef Humm has taken Americana food and ingredients, French preparation, quality ingredients and honest simplicity and blended something truly amazing. This is the greatest dining experience I've ever had in my life."},{"rating":4,"time":"4 months ago","text":"Amazing meal, but even more amazing service. \n\nI went in the middle of January, so take my review with a grain of salt, as I wasn't going during peak seasonality for produce. I'm planning on going again in summer-fall months to see how the menu changes. \n\nEverything that I ate was amazing, and I enjoyed every course, but I felt the overall menu was a little bland. There were a LOT of items with celery root (which I love), but I do wish the menu had more diversity. \n\nPros:\n- Best service I've ever had. (and they don't even allow gratuity) Everyone was very friendly, well trained, accommodating, and on top of everything\n- Great food. More traditional and less experimental, the overall word I'd use for the menu would be \"refined\"\n- Great cocktails, really well balanced\n- Classy table-side service that doesn't feel awkward or forced (I did the Manhattan cocktail cart and the vacuum coffee)\n- There are parts of the menu where you can select your course, so we were able to share dishes to taste more items\n- They really care about your experience. There's a small bite waiting for you when you arrive and they send you off with a parting dish\n\nCons:\n- I personally enjoy a bit more experimentation and unique flavors in my menu, and I felt that was missing\n- Although the staff was very friendly and casual, the overall restaurant still has a formal vibe that borders on stuffy. (not too bad though)\n- I'm not usually one to complain about portion sizes, but I do wish a few courses were slightly larger (specifically the main protein, a duck breast in my case)\n\nMy favorite dish was a clever take on eggs Benedict where there was a tin filled with ham, grits (I think), caviar, and a Hollandaise foam. I thought it was both clever and delicious.\n\nOverall I'd definitely recommend going, but maybe call ahead and check what the menu is, or go during a peak produce season?"}]},{"rating":"4.7","number_of_reviews":"731","source":"zomato","zomato_id":"16765367","reviews":[{"rating":4,"time":"one month ago","text":"Had tremendously mountain-top high expectation for this restaurant. Let me start with why the four star.   1. Kinda expecting all the beauti..."},{"rating":5,"time":"3 months ago","text":"Great Food, Great Service. Loved it 👍  Good ambience too.. As i am a foodie, i always ensure I have the best quality food. I was not disa..."},{"rating":5,"time":"4 months ago","text":"Had an amazing experience here, just wanted to talk about the people who attended to our table which enhanced our time here. Enjoyed the coc..."},{"rating":5,"time":"6 months ago","text":"What can I say. Second time to Eleven. Amazing dego. Fantastic company. Service and food the best in the world. The only downside was the he..."},{"rating":4,"time":"6 months ago","text":"I attended a security vendor event at this restaurant and the food was amazing. For appetizer, I had the scallop, for entree beef and desser..."}]},{"rating":4.8,"number_of_reviews":1617,"source":"facebook","facebook_id":"55764337255","reviews":[]},{"source":"instagram","instagram_id":"55764337255","reviews":[],"photos":{"url":"https://www.instagram.com/explore/locations/55764337255/"}},{"rating":"#2","number_of_reviews":"N/A","source":"www.tripadvisor.com","id":0,"reviews":[]},{"rating":"4.7","source":"www.opentable.com","id":0,"reviews":[]},{"rating":"4.7","source":"www.timeout.com","id":0,"reviews":[]},{"rating":"N/A","number_of_reviews":"N/A","source":"New York Times","zomato_id":0,"reviews":[],"review_article":{"url":"http://www.nytimes.com/2015/03/18/dining/restaurant-review-eleven-madison-park-in-midtown-south.html","summary":"Eleven Madison Park adopted a tasting menu on the theme of New York, meals have been marred by goofy tableside history lessons. And the chef, Daniel Humm, practices a locavorism that is strictly entry-level stuff. What Eleven Madison feeds your intellect can have the value of junk food, but what it feeds your mouth, stomach and spirit is something else. Both the kitchen and the dining room staff try as hard as any to bring delight to the table with every course. They succeed so often that only the most determinedly grumpy souls could resist.","by":"Confirmed 09/10.-mek-- NOTE: blank postcode on 2011-01-20; Mapped 2/2/11, TG; confirmed 4/20/11 - EL; confirmed 12/21/11 EL; confirmed open via recorded message and they put you on hold, to good jazz, forever.   7/23/14 - EL; sarabonisteel 3/17/15"}},{"rating":"N/A","number_of_reviews":"N/A","source":"foursquare","foursquare_id":"457ebeaaf964a5203f3f1fe3","menu":{"url":"https://foursquare.com/v/457ebeaaf964a5203f3f1fe3/device_menu"}},{"rating":"N/A","number_of_reviews":"N/A","source":"foursquare","foursquare_id":"457ebeaaf964a5203f3f1fe3","photos":{"photos":[{"url":"https://igx.4sqi.net/img/general/width223/159476_E7juwkd8AW0CE5cvuECrs3ISgFxIXkAzUSH-vFgKBTM.jpg"},{"url":"https://igx.4sqi.net/img/general/width223/37925049_240kJMAJnFpKEXTCvnJIY8nW-lVuNyXkJAfhzu6tl7I.jpg"},{"url":"https://igx.4sqi.net/img/general/width223/487189_eO-DuFs4T59WkcVToQDwxWx80RvlEUQ9d3GU-9TQ_KU.jpg"},{"url":"https://igx.4sqi.net/img/general/width223/487189_tTgTpIFTFn_NLLthct2yGVdhTBq2tRIhowIP3FRNAZU.jpg"},{"url":"https://igx.4sqi.net/img/general/width223/487189_kaaQwt-2tKoxwkp1jCw1nHJxbmVlgKeKt0U-vRCGVBY.jpg"},{"url":"https://igx.4sqi.net/img/general/width223/487189_MRgBZik759WmgQD0v_ibUALK9pW-eB-6W-fMHY80B-0.jpg"},{"url":"https://igx.4sqi.net/img/general/width223/487189_t92LI9rPay4DbAZzA5krkw5xAVSoy-7V7v5JdtTcdHA.jpg"},{"url":"https://igx.4sqi.net/img/general/width223/42124__2MfMKxgxrV8W8ofVrzFpYiBQMZQ9sjQmnZu4HNPeEc.jpg"}]}},{"rating":"N/A","number_of_reviews":"N/A","source":"foursquare","foursquare_id":"457ebeaaf964a5203f3f1fe3","reviews":[{"time":1495135118,"text":"Absolutely exquisite - a meal I never wanted to end! Each course was like a delicious work of art. The milk & honey has to be one of best deserts I've ever had.","photo_url":"https://igx.4sqi.net/img/general/width223/208277245_jYFhxrwikn9KXBWF8t3wSBrzYvpMNg2eD2tKdSZeAkU.jpg"},{"time":1437371303,"text":"Ask for a tour of the kitchen. Everyone is super nice. Sit at the bar for a cheaper a la carte menu instead of paying $225 for the tasting menu in the dining room.","photo_url":"https://igx.4sqi.net/img/general/width223/3011910_dqWDDKqvvUEoFabIuUw1onLTVjl1cTqQp1DvyGkyDp8.jpg"},{"time":1426454117,"text":"One of the best meals I've ever had. The foie gras with pickled cabbage was one of my favs of the night. Looked like cake, tasted like butter.","photo_url":"https://igx.4sqi.net/img/general/width223/6608323_5lGDQ6J9gYwX2yhi0_puub2PyyxVDXuQGx2_mghUJsk.jpg"},{"time":1434463964,"text":"Superb service over a nearly four-hour dining experience. Graciously accommodated gluten-free requests. Great for special occasions.","photo_url":"https://igx.4sqi.net/img/general/width223/41380679_k3uT4NvLO985NJ8SLBe08IWHiW4YeD6L9W8gLyOajd4.jpg"},{"time":1407159789,"text":"Ensconced in a former bank lobby, the restaurant has soaring windows that offer a romantic view of the city's prettiest park.","photo_url":"https://igx.4sqi.net/img/general/width223/1868764_lm7DRwnT8xQa5fQBa8LfcOhGkiQ11Yx4KuvAV6y9LB8.jpg"},{"time":1420310043,"text":"The best restaurant in the world 😋 great tasting menu, the experience, the ambiance, and the service, all are amazing 😍","photo_url":"https://igx.4sqi.net/img/general/width223/6374465_8KnzfIrc4K0YS6S2DwU74zDR4YbOc7bPHjLFAejjHwg.jpg"}]},{"rating":4.5,"number_of_reviews":1678,"source":"yelp","yelp_id":"eleven-madison-park-new-york","reviews":[{"rating":5,"time":"2017-11-03 19:29:07","text":"This restaurant needs no introduction, nor does it need any more amateur food critic wannabes (dream job?) like myself from validating it with our less than..."},{"rating":3,"time":"2017-11-09 10:50:46","text":"Have you ever walked away from a restaurant disappointed and wanting a \"do over meal\" from somewhere that's actually good?  That was me.\n \nMy review is..."},{"rating":4,"time":"2017-11-06 16:33:27","text":"I can't believe I'm giving \"The Best Restaurant in the World\" a 4 star rating. Completely missing the WOW factor you expect as far as food is concerned. And..."}]}]}