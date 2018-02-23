import React from 'react';
import './style.css';
class Dropdown extends React.Component{
	
	constructor(props){
		super(props);
		this.props=props;
		this.loadCity=false;
		this.cityInput="Choose City"
		this.cities=["Mumbai","Bangalore","Pune","Hyderabad","Chennai","Lucknow","Kochi","Jaipur","Ahmedabad","Chandigarh","Goa","Indore","Nashik","Ludhiana","Guwahati","Amritsar","Kanpur","Allahabad","Aurangabad","Bhopal","Ranchi","Visakhapatnam","Bhubaneswar","Coimbatore","Mangalore","Vadodara","Nagpur","Agra","Dehradun","Mysore"]
	}

	getCity () {
   	var count=0;
   	if(!this.loadCity)
   		return ( <div/> )
   	this.cities_copy = this.cities;	
   	return (
   				<div className="dropdown-content" >
   						<input type="text" name="city_name" placeholder="Enter city"  
   							   onChange={ 
   							   				(val)=>{ 
   							   						 this.cityInput = val.target.value ;
   							   						 this.forceUpdate();
   							   					   }
   							   		    }
   						/>

 	 					{   
 	 						this.cities_copy.map((each,index)=>{
 	 							if((each.toLowerCase().indexOf(this.cityInput.toLowerCase())>=0 && count<=4) ||( this.cityInput == "Choose City" && index<=4))
  	 								{	
  	 									count++;
  	 									return (
  	 									<div className="city_each" 
  	 										onClick={
  	 										 			()=> {
 	  	 										 				this.loadCity=!this.loadCity;
 	  	 										 				if(this.props.currInput.toLowerCase()!= each.toLowerCase()){
	 	  	 										 				this.props.getRestaurentCity(each.toLowerCase());
		  	 										 				this.props.setState({"selectedCityInput" : each.toLowerCase() , "individualCard":{} });
		  	 										 			}
		  	 										 			else{
		  	 										 				this.forceUpdate();
		  	 										 			}
  	 										 			    }
  	 										 		}
  	 										>
  	 									{	each.charAt(0).toUpperCase() + each.slice(1)	} 
  	 									</div>
  	 									)
  	 								}
 	 						})
 	 					}
 	 			</div>
 	 	   )
    }

	render () {
		return (
			<div className="dropdown">
				<button onClick={  ()=>{ this.loadCity=!this.loadCity; this.forceUpdate(); } } >
					{ 
						this.props.currInput.toUpperCase() 
					} 
				</button>
				{
					this.getCity() 
				}
			</div>
		)
	}
}

export default Dropdown;
