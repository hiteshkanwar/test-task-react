
import axios from 'axios'

//const server_url = "https://go-easy-bid-backend.herokuapp.com/api/v1"
//const server_url = 'http://63ab387a.ngrok.io/api/v1'
const server_url = "http://localhost:3001"

class FetchData
{
	static postData(url,data,that){
		const _that = that 
		return axios.post(server_url+url, {
		    headers: {
		        'Content-Type': 'application/json',
		        // 'ACCESS_TOKEN': JSON.parse(localStorage.getItem('currentUser')) == undefined ? 'SADFSWFsafsdafsafx12ss' : JSON.parse(localStorage.getItem('currentUser')).token
		    },
		    data
		}).catch((error) => {
			if(error.response === undefined){
		    	alert(error)
		   }else{
		   	_that.setState({loading: false})
		    	var message = error.response.data.success !== undefined ? error.response.data.success : error.response.data.error 
        	alert(message)
		   }
		})
	}

	static getData(url,that){
		const _that = that 
		return axios.get(server_url+url, {
	    headers: {
	        'Content-Type': 'application/json',
	        // 'ACCESS_TOKEN': JSON.parse(localStorage.getItem('currentUser')) == undefined ? 'SADFSWFsafsdafsafx12ss' : JSON.parse(localStorage.getItem('currentUser')).token
	    }
		}).catch((error) => {
		    if(error.response === undefined){
		    	alert(error)
		    }else{
		    	var message = error.response.data.success !== undefined ? error.response.data.success : error.response.data.error 
        	alert(message)
		    }
		})
	}
}


export {FetchData}