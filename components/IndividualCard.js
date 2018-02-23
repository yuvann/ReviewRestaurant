import React from 'react';
import axios from 'axios';
import './style.css';
 class IndividualCard extends React.Component{
	
	constructor(props){
		super(props);
		this.props=props;
		this.state ={
			"reviews":[]
		}
		this.reviewRead={}
		this.error = false;
		this.hit = true;
		this.getReviews()
 	}

	getReviews () {
		axios({
			    method : 'POST',
			    url    : 'https://myapphosted.herokuapp.com/api/review_restaurant/reviews' ,
			    data   : { id : Number(this.props.card.id) }
			}).then(response => {
					this.hit = false;
  				 	this.setState({ "reviews" : response.data.rows });
    		}).catch( error => {
 	        	alert("Something went wroung , Check Internet Connection and Try again !!")
			});
	}

	renderReview () {
   	var data = this.state.reviews;
   	if(this.hit == true)
   		return (<div style={{textAlign:"center",color:"#24a8f4"}}> Loading . .  </div>)
    if(data.length==0)
   		return (<div style={{textAlign:"center",color:"#24a8f4"}}> Be the first to review this restaurant , Hurry Up !!! </div>)
   	return  (
   				data.map((each,index)=>{
   					var date = new Date(each.date);
   					return ( 
	   							<div className="underline" >
	   							<span   style={{color:"#24a8f4",fontSize:"16px"}}>{ each.username }</span> &nbsp;&nbsp;&nbsp; <span style={{fontSize:"11px"}} >{date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()}</span> <br/>
				    			<span  >{each.comment}</span> 
	   							 </div>
   						   )
   				})
   			)
    }


   submitFeedback () {
   	var comment = document.getElementById("feedback").value;
   	var username = document.getElementById("username").value;
   	var rating =0;
   	if(username.length==0  ||  comment.Length==0 )
   	{
   		this.error=true;
   		this.forceUpdate();
   		return ;
   	}
   	this.error=false;
   	this.forceUpdate();
   	document.getElementById("username").value="";
    document.getElementById("feedback").value="";
   	this.reviewRead ={ comment ,username ,rating , id:Number(this.props.card.id) , date: String(new Date()) };
    axios({
	    method : 'POST',
	    url    : 'https://myapphosted.herokuapp.com/api/review_restaurant/create' ,
	    data   :  this.reviewRead
	}).then(response => {
  		 	this.setState({ "reviews" : this.state.reviews.concat(this.reviewRead) });
 		 	this.reviewRead={};
	}).catch( error => {
 	        alert("Something went wroung , Check Internet Connection and Try again !!")
	});
    }

   errorLoad() {
   	if( this.error == true )
   		return(<div><div className="error"> Kindly Enter all the values to submit your Review ;-) </div><br/></div>)
   	else 
   		return(<div/>)
    }
   

	render () {
		return (
			<div>
		   		<div className="head" style={{float:"left",fontSize:"22px"}} > 
			   		{this.props.card.name} 
			   		<div className="back" onClick={()=>{ this.props.back()}}>
			   		<span>&#x25C0;</span> &nbsp; Back to Restaurants 
		   			</div>
		   		</div>
	    		&nbsp;&nbsp;&nbsp;&nbsp;
	    		<img  src={this.props.card.thumb.length>0?this.props.card.thumb:"Images/restaurant_sample.png"} width="200" height="200" align="top" />
	    		<div className="list">
	    			<div className="key">Address </div>:
	    			<div className="value">
	    			{ 
	    				this.props.card.location.address
	    			}
	    			</div>
	    			<br/>
	    			<div className="key">Cuisines </div>:
	    			<div className="value">
	    			{ 
	    				this.props.card.cuisines
	    			}
	    			</div>
	    			<br/>
	    			<div className="key">Rating </div>:
	    			<div className="value">
	    			<span>
	    			{ 
	    				this.props.card.user_rating.aggregate_rating+" ★" 
	    			}
	    			</span>
	    			{
	    			 	 " - "+this.props.card.user_rating.votes+" Votes" 
	    			} 
	    			</div>
	    			<br/>
	    			<div className="key">Avg Cost </div>:
	    			<div className="value">
	    			{
	    			 	"₹ "+this.props.card.average_cost_for_two +" ( for two )" 
	    			} 
	    			</div>
	    			<br/>
	    			<div className="key">Location </div>:
	    			<div className="value" >
						<a target="_blank" href={"https://www.google.co.in/maps/search/?api=1&query="+Number(this.props.card.location.latitude)+","+Number(this.props.card.location.longitude)} >	View Map </a>
	    			</div>
	    			<br/>	 
 		   		</div>
 		   		<div className="feedback">
 		   			<div className="review_head"> Reviews	</div>
 		   			{ 
 		   				this.renderReview()
 		   			}
 		   			<br/>
 		   			{
 		   				this.errorLoad()
 		   			}
 		   			<input type="text" id="feedback" placeholder="Enter your feedback on this restaurant"  autocomplete="off"/> <br/>
 		   			<input type="text" id="username" placeholder="Enter your name"  autocomplete="off"/> <br/>
					<button onClick={()=>{ this.submitFeedback(); }}> FLY </button><br/>
 		   		</div> 
   			</div>
	   		)
	   	}
}
export default IndividualCard;