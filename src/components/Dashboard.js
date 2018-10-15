import React, { Component } from 'react';
import { FetchData } from '../helpers'
import '../css/dashboard.css'
import Loader from '../helpers/loader'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Dashboard extends Component {

	constructor(props){
		super(props)
		this.state = {
			loading: false,
			status: null,
			items: [],
			searchTime: '00',
			searchKey: '',
			searchDate: new Date().getDate()+'-'+new Date().getMonth()+"-"+new Date().getFullYear(),
			setDate: new Date()

		}
		this.renderTable  = this.renderTable.bind(this)
		this.renderTableHeader = this.renderTableHeader.bind(this)
		this.setFlag = this.setFlag.bind(this)
		this.getAllArrivals = this.getAllArrivals.bind(this)
		this.getAllDepartures = this.getAllDepartures.bind(this)
		this.toolBox = this.toolBox.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.searchBy = this.searchBy.bind(this)
		this.getOptionsTime  = this.getOptionsTime.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	componentDidMount(){
		// FetchData.getData('/users/items',this).then((response) => {
  //    this.setState({items: response.data.items})
	 //  })
	}
 
  getAllArrivals(){
  	FetchData.getData(`/arrivals?q=${this.state.searchKey}&&date=${this.state.searchDate}&&time=${this.state.searchTime}`,this).then((response) => {
     this.setState({items: response.data.arrivals, status: "arrivals", loading: false})
	  })
  }
  getAllDepartures(){
  	FetchData.getData(`/departures?q=${this.state.searchKey}&&date=${this.state.searchDate}&&time=${this.state.searchTime}`,this).then((response) => {
     this.setState({items: response.data.departures,status: "departures", loading: false})
	  })
  }

 setFlag(value){
 	this.setState({loading: true})
 	if(value=='arrivals')
 		this.getAllArrivals()
 	else if (value == 'departures')
 		this.getAllDepartures()
 }

 searchBy(value){
 	this.setState({loading: true})
 	FetchData.getData(`/${this.state.status}?q=${this.state.searchKey}&&date=${this.state.searchDate}&&time=${this.state.searchTime}`,this).then((response) => {
     this.setState({items: (response.data.arrivals || response.data.departures), loading: false})
	})
 }

 renderTable(){
 	return this.state.items.map((item) => {
	 	return( 
	 		<tr>
	      <th scope="row">{item.Tid}</th>
	      <td>{item.Expected}</td>
	      <td>{item.Airline}</td>
	      <td>{item["Arriving from"] || item['Destination']}</td>
	      <td>{item['Gate']}</td>
	      <td>{item['Terminal']}</td>
	      <td>{item['Status']}</td>
	      <td></td>
	    </tr>)
	 		})
 }

 renderTableHeader(){

	 	return( 
	 		<thead>
		    <tr>
		      <th scope="col">Time</th>
		      <th scope="col">Expected</th>
		      <th scope="col">Airline</th>
		      <th scope="col">Destination</th>
		      <th scope="col">Gate</th>
		      <th scope="col">Terminal</th>
		      <th scope="col">Status</th>
		      <th scope="col">Link</th>
		    </tr>
	  	</thead>)
 }
 
 getOptionsTime(){
 	var arr = []
  for(var i=0; i<24; i++){
 		arr.push(<option value={i.toString().length > 1 ? `${i}` : `0${i}`} >{i.toString().length > 1 ?  `${i}:00` : `0${i}:00`}</option>)
 	}
 	return arr
 }

 toolBox(){
 	if(this.state.status !== null){
	 	return(
	 	<div className="row">
	 		<ul className='search-filter'>
		 			<li>
		 				<input type="text" name="searchKey" onChange={this.handleSearch} />
		 			</li>	
			 		<li>
				 		 <DatePicker
				 		    dateFormat="DD-MM-YYYY"
				 		    name="searchDate"
				        selected={moment(this.state.setDate)}
				        onChange={this.handleChange}
				    />
				  </li>
				  <li>  
			 			<select name="searchTime" onChange={this.handleSearch}>
			 				{this.getOptionsTime()}
			 			</select>
			 		</li>
			 		<li>
			 			<span className='btn btn-primary' onClick={() => this.searchBy('airline')}>Search</span>
			 		</li>
	 		</ul>
	 	</div>
	 	)
	}
 }
 handleSearch(e){
 	this.setState({[e.target.name]: e.target.value})
 }

 handleChange(e){
 		var date = moment(e._d)
 		var finalDate = date.date().toString()+"-"+date.month().toString()+"-"+date.year().toString()
 		this.setState({"searchDate": finalDate, setDate: date })
 }


  render() {
    return (
	    <div className="container">
	    	<div className="col-md-12">
	    		<div className="row">
	    			<div className="button-content">
	    			  <button className= "btn btn-lg" 
	    			  style={{backgroundColor: this.state.status == 'arrivals' ? '#b2e2f6' : ''}}
	    			   onClick={()=> {this.setFlag('arrivals')}}>Arriaval</button>&nbsp;

	    				&nbsp;<button 
	    				style={{backgroundColor: this.state.status == 'departures' ? '#b2e2f6' : ''}}
	    				 className= "btn btn-lg"onClick={()=> {this.setFlag('departures')}} >Departure</button>
	    			</div> 
					</div>
					<div className="table-content" >
					  <div className="control-panel">
					  	{this.toolBox()}
					  </div>
						<table class="table" style={{display: this.state.loading ? 'none' : 'block'}}>
						{this.renderTableHeader()}
						 	<tbody >
								{this.renderTable()}
							</tbody>
						</table>
					</div>
					<Loader {...this.state}/>
				</div>
			</div>

    );
  }
}

export default Dashboard;
