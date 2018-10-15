import React, { Component } from 'react';
import { FetchData } from '../helpers'
import { Link, withRouter } from 'react-router-dom';
class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: {}
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		
	}



	handleChange(e){
	}
  
	handleSubmit(e){
	}


  render() {
    return (
      <div className="container">
     	</div>
    );
  }
}

export default withRouter(Login);
