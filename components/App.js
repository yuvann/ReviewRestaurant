import React from 'react';
import axios from 'axios';
import './style.css';
import Card from './Card.js'
import IndividualCard from './IndividualCard.js'
import Dropdown from './Dropdown.js'

 class App extends React.Component{
	
	constructor(props){
		super(props);
		this.props = props;
		this.restaurentInput=""
		this.selectedCityId=-1;	
		this.loading=false;
		this.state ={
 			"selectedCityInput":"Choose City",
			"individualCard":{},
			"restaurentTable":{
				  "results_found": 0,
				  "results_start": 0,
				  "results_shown": 0,
				  "restaurants":   []	
				}
		}
		this.individualCard = this.individualCard.bind(this)
		this.backToRestaurants = this.backToRestaurants.bind(this)
		this.getRestaurentCity = this.getRestaurentCity.bind(this)
 	}


	getRestaurent (query,id=this.selectedCityId) {
   		axios({
			    method: 'GET',
			    url: 'https://developers.zomato.com/api/v2.1/search?entity_id='+id+'&entity_type=city&q='+query ,
			    headers: {
			    		"user-key" : "1cbf9efcb057e05bfc714c43b70485e7"
			    }
			}).then(response => {
					this.loading=false;
				 	this.setState({ restaurentTable : response.data, individualCard :{} });
    		}).catch( error => {
			        this.setState({selectedCityInput:"Choose City"})
 	       			alert("Something went wroung , Check Internet Connection and Try again !!")
			});
    }

   getRestaurentCity (query) {
   		document.getElementById("restaurant_name").value="";
		this.restaurentInput="";
		this.loading=true
    	this.setState({restaurentTable:{ restaurants:[]}})
  		axios.get('https://developers.zomato.com/api/v2.1/cities?q='+query.toLowerCase() , { headers: { "user-key" : "1cbf9efcb057e05bfc714c43b70485e7" } }
			 ).then(response => {		
			 		this.selectedCityId=response.data.location_suggestions[0].id;	
				 	this.getRestaurent("",response.data.location_suggestions[0].id)
    		}).catch(error => {
			        this.setState({selectedCityInput:"Choose City"})
 	       			alert("Something went wroung , Check Internet Connection and Try again !!")
			});
   }

   individualCard(card) {
   	this.setState({individualCard:card})
   	this.scroll();
   }

   renderRestaurent () {
		var len =  this.state.restaurentTable.restaurants.length;
 		if(this.loading == true )
 			return ( <div style={{ backgroundImage:"url('Images/loading.gif')"}} className="loading" > </div>)
		else if( this.restaurentInput!="" && len==0)
		{
	    	return (<div className="error"> No Restaurants found for the search !</div>);
		}
 		else{
 			return this.state.restaurentTable.restaurants.map((each,index)=>{
	 			return (
	 				<Card 
	 					card={each}
	 					individualCardClick={this.individualCard}  />
 				)

 			});
 		}
   }

   backToRestaurants(){
	   	this.scroll();
	   	this.setState({individualCard:{}});
   }

   scroll(){
        document.body.scrollTop = 0;
	    document.documentElement.scrollTop = 0;
   }

   loadRestaurent (){
   	var data =[];
   		if(Object.keys(this.state.individualCard).length && this.state.restaurentTable.restaurants.length!=0 ){
   			var card = this.state.individualCard.restaurant;
   			return (
	   			<IndividualCard 
	   				card={card}
	   				back={this.backToRestaurants} />		
	   		)	
   		}
   		if(this.restaurentInput.length>0 && this.state.selectedCityInput=="Choose City")
   		{
   			data.push(<div className="error"> Select the City in which you need to find the Restaurent !</div>);
   			this.restaurentInput="";
   		}
   		else if(this.state.selectedCityInput!="Choose City" ) {
   			data.push  (	
   						<div className="restaurent_holder">
   						 	{
   						 		this.renderRestaurent()
   						 	}
   						</div>
   					)
   			return data;
   		}
		data.push (
			<div>
				<div className="general_info">
					 Find the Best Restaurants in your place <br/>
					 Review them and Taste It
				</div>
   				<div className="restaurent_holder">
	   				<Card card="crop_ice.jpg" circle="true" />
	   				<Card card="burger.jpg" circle="true" />
	   				<Card card="dosa.jpg" circle="true" />
	   			    <Card card="chicken.jpg" circle="true" />
   				</div>
   			</div>
		)
   		return data;
   }

   handleSearch	(val) {
	   	if(val.key=="Enter") 
		{
			this.restaurentInput = val.target.value ;
			if(this.state.selectedCityInput!="Choose City")
			{
					this.loading=true;
					this.getRestaurent(this.restaurentInput);
					this.setState({restaurentTable:{ restaurants:[]} })
			}
			else
				{
					document.getElementById("restaurant_name").value="";
					this.forceUpdate();
				}

  		}
   	}
 
	render(){	
 		return (
 		<div>
 			<div  style={{backgroundImage: "url('Images/bg.jpg')"}}>
	 	 		<div className="header"> 
	 	 			<span>Review Restaurants</span>	
	 	 		</div>
	 	 		<div className="search" >
		 	 		<input type="text" id="restaurant_name" autocomplete="off" placeholder="Search your Restaurants"  onKeyPress={ (val)=> {  this.handleSearch(val); }  } /> 
		 	 		<Dropdown 
		 	 			setState  = { (data) =>{ this.setState(data); } }
		 	 			currInput = { this.state.selectedCityInput } 
		 	 			getRestaurentCity = { this.getRestaurentCity }
		 	 		/>
		 	 	</div>
 	 		</div>
 	 		<div>
	 	 		{
	 	 			this.loadRestaurent()
	 	 		}
 	 		</div>
 	 		<div className="float_top" >
 	 		&#x25B2;
 	 		</div>
 	 	</div>
 	 	)
	}
};

export default App;
