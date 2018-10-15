import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route,withRouter,Redirect } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Navigation from './components/Navigation'
class App extends Component {

  constructor(props) {
    super(props)
   
  }
  componentDidMount(){
  }

  render() {
    return (
      <div className="App">
        <Route  path='/login' component={Login}/>
        <Route exact path="/" render={(props) =>  (
          <Redirect to='/app/dashboard' /> 
        )} authenticated={true}/>
        <Route path="/app" render={props => 
          <Navigation {...props} />
        }
        />
      </div>
    );
  }
}

export default withRouter(App);
