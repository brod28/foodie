import React, { Component } from 'react';
import Reviews4andMore from './Reviews4andMore/Reviews4andMore';
import Articles4andMore from './Articles4andMore/Articles4andMore'
import Reviews from './Reviews/Reviews'
import Article from './Article/Article'
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
        .then(restaurant => 
          {
            let reviews = [];
            let articles = [];
            let id_counter=0;
            restaurant.reviews.forEach(function (element) {
              id_counter++;
              element.inner_id=id_counter;
              if (!element.review_article) {
                reviews.push(element);
                element.reviews.forEach(function(review){
                  id_counter++;
                  review.inner_id=id_counter;
                })
              }
              else {
                id_counter++;
                element.review_article.inner_id=id_counter;
                articles.push(element);
              }
            });
            this.setState({
              restaurant: restaurant,
              reviews: reviews,
              articles: articles
            });
        }
            );
/*
    let reviews = [];
    let articles = [];
    let id_counter=0;
    restaurant.reviews.forEach(function (element) {
      id_counter++;
      element.inner_id=id_counter;
      if (!element.review_article) {
        reviews.push(element);
        element.reviews.forEach(function(review){
          id_counter++;
          review.inner_id=id_counter;
        })
      }
      else {
        id_counter++;
        element.review_article.inner_id=id_counter;
        articles.push(element);
      }
    });
    this.setState({
      restaurant: restaurant,
      reviews: reviews,
      articles: articles
    });

*/
  }



  render() {
    let restaurantName = <p>Loading restaurant information... </p>;
    if (this.state.restaurant.metadata) {
      restaurantName = <div>{this.state.restaurant.metadata.name} at {this.state.restaurant.metadata.address}</div>;
    }
    let reviews4andMore = <p>Loading reviews... </p>;
    if (this.state.reviews) {

      reviews4andMore = <Reviews4andMore reviews={this.state.reviews}  />
    }
    let articles4andMore = <p>Loading articles... </p>;
    if (this.state.articles) {
      articles4andMore = <Articles4andMore articles={this.state.articles} />
    }
    return (
      <div className="restaurant">
        {restaurantName}
        <Route exact path="/restaurant/:name" render={({match})=>(
            reviews4andMore
        )}/>
        <Route exact path="/restaurant/:name" render={({match})=>(
            articles4andMore
        )}/>
        <Route path="*/read_reviews/:review_platfrom_inner_id" render={({match})=>(
              <Reviews reviews={this.state.reviews} review_platfrom_inner_id={match.params.review_platfrom_inner_id} />
          )}/>
      </div>
    );
  }
}

export default Restaurant;


var restaurant = { "metadata": { "google_id": "ChIJwz2KcctC1moRJw05MBuagLI", "address": "Basement, 407/409 Swanston St, Melbourne VIC 3000, Australia", "name": "Joomak", "phone_number": "(03) 9663 7123", "area_near": "Basement, 407/409 Swanston Street, Melbourne", "description": "Joomak, Swanston Street, Melbourne, Victoria, Australia", "website": "http://www.joomak.com.au/", "location": { "lat": -37.809035, "lng": 144.963227 } }, 
"reviews": [{ "rating": 4, "number_of_reviews": "N/A", "source": "google", "reviews": [{ "rating": 4, "time": "a week ago", "text": "The place was hard to find at first but the foods were great. I love the flavoured rice wines. It is crowded during evening so you need to book first." }, { "rating": 4, "time": "2 months ago", "text": "The atmosphere is really great, cosy, somewhat private, dark but also well lit when it matters. Great location. The food is tasty. The BBQ chicken I had was great however the sweet and sour pork had too much sauce on it. I would say the dishes are a little on the small side, but the drinks were good." }, { "rating": 3, "time": "4 weeks ago", "text": "They have amazing rice wine with different flavor but make sure you try the peach one, absolutely impressive. However, this is basically a place for drinking rather than having a tatse of Korean cuisine. They don't have the popular kinds of food but they do have the kinds that you may enjoy having little small bites during drinking. The food is just ok." }, { "rating": 4, "time": "a month ago", "text": "The food is pretty average but this place has the best flavoured makeollis in Melbourne out of which peach makeolli is my favourite! It's a quick drink and leave place because you can only book a table for 1.5 hours. Joomak is always busy, hence a table booking is recommended x" }, { "rating": 4, "time": "2 months ago", "text": "Open until really late, so a good place for supper. Peach rice wine is divine, kimchi stew and kimchi pancake also nice. Cool little private booths for dining." }] }, { "rating": 3.5, "number_of_reviews": 3, "source": "yelp", "yelp_id": "joomak-melbourne-2", "reviews": [{ "rating": 3, "time": "2016-02-19 05:05:20", "text": "It's hard to find and easy to miss - Joomak is a little basememt bar right next to RMIT. You might not know what you're getting into as you walk down the..." }, { "rating": 4, "time": "2016-10-30 00:19:57", "text": "Known for their rice wine and fruit soju! This korean bar is quite popular even though it's location is somewhat hidden. They open till late and can be..." }, { "rating": 3, "time": "2015-10-12 18:01:48", "text": "my favourite thing here is the flavoured soju and rice wines. i sound like an alcoholic right now but i can assure you i'm not and just enjoy the occasional..." }] }, { "rating": "4.0", "number_of_reviews": "1615", "source": "zomato", "zomato_id": "16577469", "reviews": [{ "rating": 5, "time": "24 days ago", "text": "If you’re looking for a late night feed this is the place to go. I was thrilled to know it closed at 3am. Found it difficult to find but b..." }, { "rating": 4, "time": "29 days ago", "text": "Have been to Joomak a few times in the past few years. Very nice atmosphere here. Always busy so must book. They have a few booth seats whic..." }, { "rating": 4.5, "time": "one month ago", "text": "The food is pretty average but this place has the best flavoured makeollis in Melbourne out of which peach makeolli is my favourite! It's a ..." }, { "rating": 3, "time": "one month ago", "text": "The best thing about Joomak is that it opens late hours. If you're tired after a long night and hungry for proper food, Joomak's probably a ..." }, { "rating": 4, "time": "one month ago", "text": "The rice wine tastes really good although a little bit too sweet for me. The cheese rice cake is my favorite because it's chewy and fabulous..." }] }, { "rating": "3.5", "number_of_reviews": "13", "source": "www.tripadvisor.com", "id": 0, "reviews": [] }, { "rating": "it", "number_of_reviews": "N/A", "source": "www.booking.com", "id": 0, "reviews": [] }, { "rating": "4.3", "number_of_reviews": "29", "source": "www.facebook.com", "id": 0, "reviews": [] }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "New York Times", "zomato_id": 0, "reviews": [], "review_article": { "url": "https://www.nytimes.com/2017/11/09/dining/joomak-review-korean-food-melbourne-australia.html", "summary": "Joomak is hidden underground in the basement of a personality-less Melbourne office building, serving late night Korean pub food that&rsquo;s hard to find elsewhere in the city. Who is cramming into the long low room, with its booths tucked into nooks along its sides? Mainly young people speaking Korean. They&rsquo;re here for blended sochu and fruit slushies, served in pitchers, and unfiltered rice wine on tap, served in metal tea kettles and drank from shallow metal bowls. And they&rsquo;re here for the food that goes with drinking: corn kernels heaped in a pile and smothered in melted cheese; egg rolls stuffed with cheese and fish roe; and yes, spicy pan-fried chicken.", "by": "mark josephson 11/9/2017" } }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "New York Times", "zomato_id": 0, "reviews": [], "review_article": { "url": "https://www.nytimes.com/2017/11/09/dining/joomak-review-korean-food-melbourne-australia.html", "summary": "Joomak is hidden underground in the basement of a personality-less Melbourne office building, serving late night Korean pub food that&rsquo;s hard to find elsewhere in the city. Who is cramming into the long low room, with its booths tucked into nooks along its sides? Mainly young people speaking Korean. They&rsquo;re here for blended sochu and fruit slushies, served in pitchers, and unfiltered rice wine on tap, served in metal tea kettles and drank from shallow metal bowls. And they&rsquo;re here for the food that goes with drinking: corn kernels heaped in a pile and smothered in melted cheese; egg rolls stuffed with cheese and fish roe; and yes, spicy pan-fried chicken.", "by": "mark josephson 11/9/2017" } }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "New York Times", "zomato_id": 0, "reviews": [], "review_article": { "url": "https://www.nytimes.com/2017/11/09/dining/joomak-review-korean-food-melbourne-australia.html", "summary": "Joomak is hidden underground in the basement of a personality-less Melbourne office building, serving late night Korean pub food that&rsquo;s hard to find elsewhere in the city. Who is cramming into the long low room, with its booths tucked into nooks along its sides? Mainly young people speaking Korean. They&rsquo;re here for blended sochu and fruit slushies, served in pitchers, and unfiltered rice wine on tap, served in metal tea kettles and drank from shallow metal bowls. And they&rsquo;re here for the food that goes with drinking: corn kernels heaped in a pile and smothered in melted cheese; egg rolls stuffed with cheese and fish roe; and yes, spicy pan-fried chicken.", "by": "mark josephson 11/9/2017" } }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "New York Times", "zomato_id": 0, "reviews": [], "review_article": { "url": "https://www.nytimes.com/2017/11/09/dining/joomak-review-korean-food-melbourne-australia.html", "summary": "Joomak is hidden underground in the basement of a personality-less Melbourne office building, serving late night Korean pub food that&rsquo;s hard to find elsewhere in the city. Who is cramming into the long low room, with its booths tucked into nooks along its sides? Mainly young people speaking Korean. They&rsquo;re here for blended sochu and fruit slushies, served in pitchers, and unfiltered rice wine on tap, served in metal tea kettles and drank from shallow metal bowls. And they&rsquo;re here for the food that goes with drinking: corn kernels heaped in a pile and smothered in melted cheese; egg rolls stuffed with cheese and fish roe; and yes, spicy pan-fried chicken.", "by": "mark josephson 11/9/2017" } }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "New York Times", "zomato_id": 0, "reviews": [], "review_article": { "url": "https://www.nytimes.com/2017/11/09/dining/joomak-review-korean-food-melbourne-australia.html", "summary": "Joomak is hidden underground in the basement of a personality-less Melbourne office building, serving late night Korean pub food that&rsquo;s hard to find elsewhere in the city. Who is cramming into the long low room, with its booths tucked into nooks along its sides? Mainly young people speaking Korean. They&rsquo;re here for blended sochu and fruit slushies, served in pitchers, and unfiltered rice wine on tap, served in metal tea kettles and drank from shallow metal bowls. And they&rsquo;re here for the food that goes with drinking: corn kernels heaped in a pile and smothered in melted cheese; egg rolls stuffed with cheese and fish roe; and yes, spicy pan-fried chicken.", "by": "mark josephson 11/9/2017" } }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "New York Times", "zomato_id": 0, "reviews": [], "review_article": { "url": "https://www.nytimes.com/2017/11/09/dining/joomak-review-korean-food-melbourne-australia.html", "summary": "Joomak is hidden underground in the basement of a personality-less Melbourne office building, serving late night Korean pub food that&rsquo;s hard to find elsewhere in the city. Who is cramming into the long low room, with its booths tucked into nooks along its sides? Mainly young people speaking Korean. They&rsquo;re here for blended sochu and fruit slushies, served in pitchers, and unfiltered rice wine on tap, served in metal tea kettles and drank from shallow metal bowls. And they&rsquo;re here for the food that goes with drinking: corn kernels heaped in a pile and smothered in melted cheese; egg rolls stuffed with cheese and fish roe; and yes, spicy pan-fried chicken.", "by": "mark josephson 11/9/2017" } }, { "rating": "N/A", "number_of_reviews": "N/A", "source": "New York Times", "zomato_id": 0, "reviews": [], "review_article": { "url": "https://www.nytimes.com/2017/11/09/dining/joomak-review-korean-food-melbourne-australia.html", "summary": "Joomak is hidden underground in the basement of a personality-less Melbourne office building, serving late night Korean pub food that&rsquo;s hard to find elsewhere in the city. Who is cramming into the long low room, with its booths tucked into nooks along its sides? Mainly young people speaking Korean. They&rsquo;re here for blended sochu and fruit slushies, served in pitchers, and unfiltered rice wine on tap, served in metal tea kettles and drank from shallow metal bowls. And they&rsquo;re here for the food that goes with drinking: corn kernels heaped in a pile and smothered in melted cheese; egg rolls stuffed with cheese and fish roe; and yes, spicy pan-fried chicken.", "by": "mark josephson 11/9/2017" } }] 
};