import React from 'react'

const FoodList = (props)=>{
    return(
        <>
            {props.foods.length > 0 ? props.foods.map((food)=>{
                const {foodName, restaurantName, foodPrice, foodType, foodImage, foodCategory} = food
                return(
                    <>
                        <h5>{foodCategory}</h5>
                        <div className='food_items' key={food._id}>
                            <div className="food_img">
                                <img src={foodImage ? require('../../uploads/' + foodImage) : null} alt="food"/>
                            </div>

                            <div className="food_info">
                                <h5 className="food_title">{foodName} {foodType ? `-${foodType}` : ''}</h5>
                                <span>{restaurantName}, </span>
                                <span>Rs.{foodPrice}</span>
                                <button onClick={()=> null}>+</button>
                            </div>
                        </div>
                    </>
                )
            }) : <h5>Food not found</h5> }
        </>
    )
}
export default FoodList