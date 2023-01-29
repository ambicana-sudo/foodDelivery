import React, {useState, useEffect} from 'react'
import './restaurant.css'
import RestaurantList from './restaurantList'
import Search from '../../component/search'

const Restaurant = ()=>{
	const [restaurants, setRestaurants] = useState([])
	const [loading, setLoading] = useState(false)
	// const [key, setKey] = useState('')
	
	const fetchList = async(key) => {
		let response;
		if(key){
			response = await fetch(`http://localhost:3000/restaurant?name=${key}`)
		}else{
			response = await fetch(`http://localhost:3000/restaurant`)
		}
		
		const data = await response.json();
		
		if(data){
			setRestaurants(data.restaurantData)
			setLoading(true)
		}
	}
	useEffect(()=>{
		fetchList()
  	},[])

	return(

		<>
			<div className='top_section'>
				<div className='form_section'>
					<div className='text_block'>
						<h1>Search <br /> Restaurant or Cuisine</h1>
						<p>Order food from the widest range of restaurants...</p>
					</div>

					<Search fetchdata={fetchList}/>
				</div>
			</div>
			<div className='restro_section'>
				<div className='container'>
					<h2 className='section_title'>All Restaurants</h2>
					<RestaurantList restaurants={restaurants} load={loading}/>
				</div>
			</div>
		</>
	)
}

export default Restaurant