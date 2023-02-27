import { message } from 'antd';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CardImage from '../../images/card_img.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlRice, faLocationDot, faFontAwesome } from '@fortawesome/free-solid-svg-icons'
import Rating from '@mui/material/Rating';
import FoodList from './foodList';
import FoodCart from '../../component/cart';

const RestaurantDetail = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [foods, setFoods] = useState([])
    // const [searchKey, setSearchKey] = useState('')
    console.log(foods)

    const restroName = restaurants.name
    const params = useParams();
    const { id } = params;

    const fetchDetails = async () => {
        const response = await fetch(`http://localhost:3000/restaurant/${id}`);
        const data = await response.json();
        if (data) {
            setRestaurants(data)
            // console.log(data)
        } else {
            message.error('details not found')
        }
    }
    const fetchFood = async () => {
        const response = await fetch(`http://localhost:3000/food/${restroName}`);
        const data = await response.json();

        if (data) {
            setFoods(data.foodList)
        } else {
            message.error('details not found')
        }
    }

    useEffect(() => {
        fetchDetails()
        fetchFood()
    }, [id, restroName])

    const searchFood = (key) => {
        if (key === '') {
            fetchFood()
        } else {
            const searchList = foods.filter((food) => {
                return food.foodName.toLowerCase().includes(key.toLowerCase())
            })
            setFoods(searchList)
        }
    }

    return (
        <>
            <div className='restro_detail'>
                <div className='restro_img'>
                    <img src={restaurants.restroImage ? require('../../uploads/' + restaurants.restroImage) : CardImage} alt="" />
                </div>

                <div className='restro_info'>
                    <h1>{restaurants.name}</h1>
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
                            <div className='search'>
                                <input type="search" placeholder="Search Food.." onChange={(e) => searchFood(e.target.value)} />
                            </div>

                            <FoodList foods={foods} />
                        </div>

                        <div className='food_cart'>
                            <h4>Your Orders</h4>
                            <FoodCart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RestaurantDetail