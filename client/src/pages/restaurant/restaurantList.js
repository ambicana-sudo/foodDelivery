import React from 'react'
import CardImage from '../../images/card_img.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlRice, faLocationDot, faFontAwesome } from '@fortawesome/free-solid-svg-icons'
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

const RestaurantList = (props) => {
	return (
		<div className='card_list'>
			{props.restaurants.length > 0 ? props.restaurants.map((item,id) => {
				return (
					<div className='card' key={id}>
						<div className='card_img'>
						<Link to={`restaurant/${item._id}`}><img src={require('../../uploads/' + item.restroImage)} alt="" />
							<h3 className='card_name'>{item.name}</h3></Link>
						</div>
						<div className='card_info'>
						<Link to={`restaurant/${item._id}`}>
							<p className='card_location'><i><FontAwesomeIcon icon={faLocationDot} /></i>{item.location}</p>
							<p className='card_category'><i><FontAwesomeIcon icon={faBowlRice} /></i>{item.category}</p>
							<p className='rating'>
								<i><FontAwesomeIcon icon={faFontAwesome} /></i>
								<Rating name="size-small read-only" value={item.rating} defaultValue={2} precision={0.5} readOnly />
							</p>
							</Link>
						</div>
					</div>
				)
			}) : props.load ? <h3>Restaurant not found</h3> : 'loading...'}
		</div>
	)
}
export default RestaurantList