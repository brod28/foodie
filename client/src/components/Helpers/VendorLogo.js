import React, { Component } from 'react';

class VendorLogo extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      source: this.props.source
    }
  }
  render() {
    return (
      <img className="vendor_logo" src={require('../../images/logos/'+this.props.source.replace('www.','').replace('.com','')+'_logo.png')} />
    )
  }
}  

  
  export default VendorLogo;
  