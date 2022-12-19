import { message } from 'antd';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import CardImage from '../../images/card_img.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlRice, faLocationDot, faFontAwesome } from '@fortawesome/free-solid-svg-icons'
import Rating from '@mui/material/Rating';
import defaultImg from '../../images/meal.png'

const RestaurantDetail = ()=>{
    const [restaurants, setRestaurants] = useState([]);
    const [foods, setFoods] = useState([])
    // const [filterFoods, setFilterFoods] = useState([])
    const params = useParams();
    const {id} = params;
    console.log(foods)

    const fetchDetails = async()=>{
        const response = await fetch(`http://localhost:5000/restaurant/${id}`);
        const data = await response.json();
        if(data){
            setRestaurants(data)
            // console.log(data)
        }else{
            message.error('details not found')
        }
    }
    const fetchFood = async()=>{
        const response = await fetch(`http://localhost:5000/food`);
        const data = await response.json();
        if(data){
            setFoods(data.foodList)
        }else{
            message.error('details not found')
        }
    }

    const filterFood = foods.filter((food)=>{
        if(restaurants.name === food.restaurantName){
            return food
        }
    })
    // console.log(filterFood)

    useEffect(()=>{
        fetchDetails()
        fetchFood()
    }, [id])

    return(
        <>
            <div className='restro_detail'>
                <div className='restro_img'>
                    <img src={restaurants.restroImage ? require('../../uploads/' + restaurants.restroImage) : CardImage} alt=""/>
                </div>

                <div className='restro_info'>
                    <h3>{restaurants.name}</h3>
                    <p><i><FontAwesomeIcon icon={faLocationDot} /></i>{restaurants.location}</p>
                    <p><i><FontAwesomeIcon icon={faBowlRice} /></i>{restaurants.category}</p>
                    <p>
                    <i><FontAwesomeIcon icon={faFontAwesome} /></i>
                    <Rating name="size-small read-only" value={restaurants.rating} defaultValue={2} precision={0.5} readOnly />{restaurants.rating}
                    </p>
                </div>
            </div>

            <div className='menu'>
                <div className='container'>
                    <div className='restroFood'>
                        <div className='category'>
                            <h4>Categories</h4>
                        </div>
                        <div className='food_list'>
                            <h4>Menu</h4>
                            <div className=''>
                                {filterFood.length > 0 ? (filterFood.map((food)=>{
                                    const {foodName, restaurantName, foodPrice, foodType, foodImage} = food
                                    return(
                                        <div className='food_items'>
                                            <div className="food_img">
                                                <img src={foodImage ? require('../../uploads/' + foodImage) : defaultImg} alt="food"/>
                                            </div>

                                            <div className="food_info">
                                                <h5 className="food_title">{foodName} {foodType ? `-${foodType}` : ''}</h5>
                                                <span>{restaurantName}, </span>
                                                <span>Rs.{foodPrice}</span>
                                                <button onClick={()=> null}>+</button>
                                            </div>
                                        </div>
                                    )
                                })): 'loading'}
                            </div>
                        </div>
                        <div className='food_cart'>
                            <h4>Your Orders</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RestaurantDetail