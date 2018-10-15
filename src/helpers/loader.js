import React, {Component} from 'react';

import '../css/loader.css'
export default class Loader extends Component {
  render() {
    return (
      this.props.loading ?
        <div style={{ top: 50, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: 1}}>
        	<div className='outer-loader'>
        		<div id="loader"></div>
        	</div>
        </div>
      : null
    )
  }
}
