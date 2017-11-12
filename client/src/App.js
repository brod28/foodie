import React, { Component } from 'react';
import SearchResult from './components/SearchResult/SearchResult';
import Restaurant from './components/Restaurant/Restaurant';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {restaurants: []}
  }

  render() {
    return (
    <Router>
      <div className="App">
        <p>
          Welcome
        </p>
          <Route path="/search/:name" render={({match})=>(
              <SearchResult name={match.params.name}>
              </SearchResult>
          )}/>
          <Route path="/restaurant/:name" render={({match})=>(
            <Restaurant name={match.params.name}>
            </Restaurant>
          )}/>
      </div>
    </Router>
    );
  }
}

export default App;