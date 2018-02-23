import React from 'react';
import './style.css';
 class Card extends React.Component{
	
	constructor(props){
		super(props);
		this.props=props;
	}

	render () {
		
		if(this.props.circle=="true"){
			return ( <div className="image_card"><img src={"Images/"+this.props.card} /></div> )
		}

		return (

				<div className="restaurent_card"  onClick={ ()=> { this.props.individualCardClick(this.props.card)} } >
				<img src={this.props.card.restaurant.thumb.length>0?this.props.card.restaurant.thumb:"Images/restaurant_sample.png"} width="150" height="150" align="top" />
				<div className="content">
				<div className="hotel_name" >
				{
					this.props.card.restaurant.name
				}
				</div>
 				<span class="rating"> { this.props.card.restaurant.user_rating.aggregate_rating+" ★" } </span>
				&nbsp;&nbsp;
				{
					this.props.card.restaurant.user_rating.votes
				}	&nbsp;Votes
 				<div className="address">
				{
					this.props.card.restaurant.location.address
				}
				</div>
				</div>
				</div>
			)
	}
};
export default Card;

