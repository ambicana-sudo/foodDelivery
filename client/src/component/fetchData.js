import React from 'react'

const FetchData = async(endpoint)=>{
    const response = await fetch(`http://localhost:3000/${endpoint}`)
	const data = await response.json();
    if(data){
        setRestaurants(data.restaurantList)
    }
}

export default FetchData