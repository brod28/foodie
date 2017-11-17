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
    ///*
    fetch('/api/reviews?name=' + this.props.name)
      .then(res => res.json())
      .then(restaurant => {
        this.setState(this.getStateObject(restaurant));
      });
    //*/
    //this.setState(this.getStateObject(restaurant));
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
    let restaurantName = <p>Loading restaurant information... </p>;
    if (this.state.restaurant.metadata) {
      restaurantName = <HeaderForPopup name={this.state.restaurant.metadata.name} url={this.state.restaurant.metadata.website} />;
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




var restaurant = { "metadata": { "google_id": "ChIJkXQ3_INZwokRcJD47PFAGvQ", "address": "8 Extra Pl, New York, NY 10003, USA", "name": "Momofuku Ko", "phone_number": "(212) 203-8095", "area_near": "8 Extra Place, New York", "description": "Momofuku Ko, Extra Place, New York, NY, United States", "website": "http://ko.momofuku.com/", "location": { "lat": 40.7248211, "lng": -73.99137230000001 } }, "reviews": [{ "rating": 4.6, "number_of_reviews": "N/A", "source": "google", "reviews": [{ "rating": 5, "time": "a month ago", "text": "Amazing experience and some of the best food I've ever had. Never been to a Michelin star restaurant before, but they exceeded all expectations. I was talking with the waitstaff about The Nugget Spot, which they hadn't heard of, but is one of my favorite places in NY... so they made me a chicken nugget using a chicken oyster. It was a lot more relaxed than I would've expected for such a nice restaurant. Great atmosphere, great service. Bar menu is definitely worth doing.\n\nI had never done a tasting menu before, so it was really interesting trying that. Really interesting/unusual food combinations (wild rice and ice cream?) but everything tasted so good. I'm allergic to shellfish, so they did substitute things - like I got a mushroom roll instead of a lobster roll.\n\nWill absolutely go back there next time I'm in NY. If you do the bar menu, keep in mind they only have 6 seats, so it can be a bit difficult to get into - took me about 2 hrs before there was space." }, { "rating": 5, "time": "a month ago", "text": "Wow, just wow. Ko was an absolutely amazing experience. If I could give this 10/5 stars, I would in a heartbeat. The care that was put into each dish was astounding, from the lobster roll to the dry aged meat. This was my first time to a Michelin star’d restaurant, and I have to say, all those other restaurants have a high bar set for them by this place. The drink pairing surpassed all expectations, and complemented each dish wonderfully. Sean and his crew are doing amazing things here, come here and live this special place, I promise that you won’t be disappointed. Also, these people are bread wizards - we couldn’t get enough!" }, { "rating": 5, "time": "in the last week", "text": "Delightfully creative; superb quality; engaging staff; relaxing atmosphere." }, { "rating": 5, "time": "3 weeks ago", "text": "Great food and service. It kinda freaked me out because of the Korean ingredients and my growing up eating traditional Korean food." }, { "rating": 5, "time": "4 weeks ago", "text": "Save up, go, sit at the counter. The best restaurant experience I have had." }] }, { "rating": 4.5, "number_of_reviews": 194, "source": "yelp", "yelp_id": "momofuku-ko-new-york-3", "reviews": [{ "rating": 5, "time": "2017-11-03 19:31:43", "text": "For our wedding anniversary dinner this year, we decided to switch it up from Blue Hill and try out something different this time. We ended up settling on..." }, { "rating": 3, "time": "2017-10-16 18:34:18", "text": "Hmm it's a mixed feeling of Momofuku today. We had some very delicious dish, but many were very mediocre, and some were even weird.. Maybe it's because our..." }, { "rating": 4, "time": "2017-09-30 19:27:27", "text": "Located in a sneaky alleyway off of E 1st Street, I was finally able to snag a coveted seat to try the 11-course pre-fixe weekend brunch menu at around..." }] }, { "rating": "4.0", "number_of_reviews": "287", "source": "zomato", "zomato_id": "16772773", "reviews": [{ "rating": 4, "time": "15 days ago", "text": "Taste wise, Momofuku Ko is my favorite restaurant in NYC. It would still be my favorite restaurant overall, but the rise in prices over the ..." }, { "rating": 5, "time": "29 days ago", "text": "Some things we loved: The fluke sashimi (paired amazingly with the yuzu salt), Sea Urchin with chickpea hozon and a douse of olive oil (this..." }, { "rating": 4, "time": "4 months ago", "text": "À chaque année, je regarde la liste des top 100 restos au monde et je me demande ce que je peux essayer comme cuisine en voyage. Cette ann..." }, { "rating": 4, "time": "6 months ago", "text": "The uni and blue steak were highlights... Some kind of salty and spice with the lovely uni textures, and the steak was smokey salty and pepp..." }, { "rating": 4, "time": "6 months ago", "text": "Had dinner there last friday. Really fantastic dinner. I ate here with friends. We are drinking group. In addition to the real fantastic foo..." }] }, { "rating": 4.7, "number_of_reviews": 359, "source": "facebook", "facebook_id": "130389693707888", "reviews": [] }, { "source": "instagram", "instagram_id": "130389693707888", "reviews": [], "photos": { "url": "https://www.instagram.com/explore/locations/130389693707888/" } }, { "rating": "4.5", "number_of_reviews": "336", "source": "www.tripadvisor.com", "id": 0, "reviews": [] }, { "rating": "locations", "number_of_reviews": "N/A", "source": "www.booking.com", "id": 0, "reviews": [] }, { "rating": "4.8", "source": "www.opentable.com", "id": 0, "reviews": [] }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "newyorktimes", "zomato_id": 0, "reviews": [], "review_article": { "url": "http://www.nytimes.com/2015/10/14/dining/restaurant-review-momofuku-ko-east-village.html", "summary": "David Chang's original Momofuku Ko was a daring experiment that asked: If you aspired to serve food as original and refined as anything in an expensive uptown restaurant but wanted to keep prices down, exactly how many amenities could you strip out? The answer turned out to be &ldquo;Not quite that many, Dave,” but the question was the right one at the right time. With Ko&rsquo;s move to a larger space a few blocks south, that experiment officially ended. The new Ko has amenities galore and a price to match. There is a high degree of finesse in executive chef Sean Gray&rsquo;s $175 tasting menus, much more comfort for cooks and diners alike, and wine in uncannily delicate glasses from some of the world&rsquo;s most revered grape stompers. The restaurant is not an experiment, but rather a statement of what fancy dining has become, in large part due to the influence of the original. ", "by": "Confirmed 10/27/10, TG Confirmed 7/12/11 -EL; listened to recorded message; confirmed 4/4/12 - EL; \nupdated to reflect address 6/18/12; confirmed open via website  1/23/13 - EL;  confirmed open via website  2/12/14 - EL; sara bonisteel 10/13/15" } }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "foursquare", "foursquare_id": "546baf30498edfac406853ee", "menu": { "url": "https://foursquare.com/v/546baf30498edfac406853ee/device_menu" } }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "foursquare", "foursquare_id": "546baf30498edfac406853ee", "photos": { "photos": [{ "url": "https://igx.4sqi.net/img/general/height250/10141_V0kGCzonECz1NHEy6cxzbfUbscdKzE273UD1WW5qRqI.jpg" }, { "url": "https://igx.4sqi.net/img/general/height250/13411170_OVFIhp1KM8-k1oxFw542Of516P1e2-cHLt3ZNFFNKGA.jpg" }, { "url": "https://igx.4sqi.net/img/general/height250/13411170_0hEtZIDYQL02RDOqCwlrvxcgeZiijI2Y12B92jZ-Qu8.jpg" }, { "url": "https://igx.4sqi.net/img/general/height250/13411170_xdGMbs0tXYrMhDGk4kjzMB-wF_GFu2pr3jHFSCO2HnU.jpg" }, { "url": "https://igx.4sqi.net/img/general/height250/13411170_bRfvhryKKPq0vaz9eacbSBGqBoO0M9-LcnQbXUsCoJQ.jpg" }, { "url": "https://igx.4sqi.net/img/general/height250/13411170_D9su9GvbqyXWQmq59HN1Xy7gbBzNmNtFTvSJ9O9APZI.jpg" }, { "url": "https://igx.4sqi.net/img/general/height250/13411170_aX_G1P5Td4rDQ-ryEnBaepIDW3MseP44C7R_WBv_kLc.jpg" }, { "url": "https://igx.4sqi.net/img/general/height250/13411170_Ef-lkHjXPIbjiPsiV8ky7785zwRHcnFCT_2Ybm8_CsE.jpg" }] } }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "foursquare", "foursquare_id": "546baf30498edfac406853ee", "reviews": [{ "time": 1437889026, "text": "An amazing dining experience. Beautiful plates. Sitting around the kitchen watching everything & interacting with the chefs made everything even better.  Great wine list. Attentive staff.", "photo_url": "https://igx.4sqi.net/img/general/height250/824218_eFIsWsA6ssncnTSeMZJEnsfEmGro1EiTQsqgZnbNq3U.jpg" }, { "time": 1426983779, "text": "As delicious as it is expensive. Expect 15–20 courses that will leave you very full. Less Asian-influenced than Ssam and Noodle Bars.", "photo_url": "https://igx.4sqi.net/img/general/height250/20546_OaJaR17K3B6kDaXp-HSYrGmsGX64Bbzn4P1k278xyG4.jpg" }, { "time": 1460408447, "text": "Amazing flavor, incredible experience. The uni is to die for, as is the duck pie. Take the night's menu with you as a souvenir :)", "photo_url": "https://igx.4sqi.net/img/general/height250/85980443_qsIi_KLyUAfN6UKYVedLN2TuZEdc5Nx1dOszgpAknpw.jpg" }, { "time": 1431380725, "text": "\"Chang has taught us at once how to take food more seriously and consume it more casually.\"", "photo_url": "https://igx.4sqi.net/img/general/height250/2611536_OPDT9Jen6CjHVUieF2X3QTYLW2EQltne71FvIWNc4U8.jpg" }, { "time": 1429065310, "text": "It worth the money. Mackerel pressed sushi is my fav.", "photo_url": "https://igx.4sqi.net/img/general/height250/65876796_G1bD9WLht8RYt0YgvHj_D0V78oeau0FQv_oVXEMNZeE.jpg" }, { "time": 1499981413, "text": "A well worth 2 Michelin Stars.", "photo_url": "https://igx.4sqi.net/img/general/height250/339105_2orELm_K17A8xpF01jCKC8ONXGEu9-1PRR1Sd3JJK6w.jpg" }] }] }