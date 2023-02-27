import React from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { setOrdersList } from '../../reducerSlice/cartSlice';

const FoodList = (props) => {
    const dispatch = useDispatch()

    const addToCart = (e, selectedItem, id) => {
        props.foods[id].orderQuantity = 1
        message.success('Added your order to cart')
        // selectedItem.orderQuantity = 1
        // e.target.disabled = true
        dispatch(setOrdersList(selectedItem))
    }

    return (
        <>
            {props.foods.length > 0 ? props.foods.map((food, id) => {
                const { foodName, restaurantName, foodPrice, foodType, foodImage, foodCategory } = food
                return (
                    <>
                        <h5>{foodCategory}</h5>
                        {props.foods.filter((item)=>{
                            if(item.foodCategory){
                                
                            }
                        })}
                        <div className='food_items' key={food._id}>
                            <div className="food_img">
                                <img src={foodImage ? require('../../uploads/' + foodImage) : null} alt="food" />
                            </div>

                            <div className="food_info">
                                <h3 className="food_title">{foodName} {foodType ? `-${foodType}` : ''}</h3>
                                <span>{restaurantName}, </span>
                                <span>Rs.{foodPrice}</span>
                                <button onClick={(e) => addToCart(e, food, id)}>+</button>
                            </div>
                        </div>
                        
                    </>
                )
            }) : <h5>Food not found</h5>}
        </>
    )
}
export default FoodList