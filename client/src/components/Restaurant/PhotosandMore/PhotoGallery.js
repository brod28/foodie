import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class PhotoGallery extends Component {
  
    constructor(props) {
      super(props);
      
      this.state = {
        photos: this.props.photos
      }
    }
    render() {
        return (
            <div id="photos_photo_ancor" className="photos_photo">
              {this.state.photos.map(photo=> 
                    <img src={photo.url} />
              )}
            </div>
          
      )
    }
  }
  export default PhotoGallery;
  