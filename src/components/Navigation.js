import React, {Component} from 'react'
//import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';

import PrivateRoute from '../private-route'
import Dashboard from './Dashboard'
import { FetchData } from '../helpers'
import '../css/navigation.css'

class Navigation extends Component {
  constructor() {
    super();
    // this.handlLogout = this.handlLogout.bind(this)
    // this.logoutButton = this.logoutButton.bind(this)
  }



  showAlert(){
    //console.log(""+JSON.stringify(this.state))
    if(this.state.showError){
      //show the error message here.
      return(
        <div className="error-message-box" style={{display:this.state.showAlert}}>
          <span className="alert-error"><i className="fa fa-times"></i></span>
          <span className="error-detail">{this.state.message}</span>
        </div>
      );
    }
  }

  // logoutButton(){
  // 	if(localStorage.getItem('currentUser') !== undefined){
		// 	return(<button className='logoutButton' onClick={this.handlLogout}>Logout</button>)
		// }
  // }




  render() {
    return (
      <div id="wrapper">
      	<header>
					<nav style={{backgroundColor: 'black', marginBottom: 30}} className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
					  <span style={{color: 'white'}}>welcome </span>
					</nav>
				</header>
        <div style={{marginTop: 30}}>
           	<PrivateRoute path={this.props.match.url + "/dashboard"} component={Dashboard} authenticated={true} />
        </div>
      </div>
    );
  } 
}

export default withRouter(Navigation);
