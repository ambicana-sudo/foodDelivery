import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { increaseOrderQuantity, decreaseOrderQuantity, deleteOrderItem } from '../reducerSlice/cartSlice'
import { useDispatch } from 'react-redux'
import PriceSummary from './priceSummary'

const FoodCart = () => {
    const { ordersList } = useSelector(state => state.foodCart)
    const dispatch = useDispatch()
    const increaseQty = (item) => {
        dispatch(increaseOrderQuantity(item))
    }

    const decreaseQty = (item) => {
        dispatch(decreaseOrderQuantity(item))
    }

    const deleteCartItem = (item) => {
        dispatch(deleteOrderItem(item))
    }
    return (
        <div className='cart'>
            {ordersList.length > 0 ? ordersList.map((item, id) => {
                console.log(item.orderQuantity)
                const { foodPrice, foodName, orderQuantity } = item;

                return (
                    <div className="order_card" key={id}>
                        <p>{foodName}</p>

                        <div className='order-info'>
                            <span style={{ float: 'right' }}>{foodPrice * orderQuantity}</span>
                            <div className="qty">
                                <span onClick={() => decreaseQty(item)}>-</span>
                                <span>{orderQuantity}</span>
                                <span onClick={() => increaseQty(item)}>+</span>
                            </div>

                            <button className="cancel" onClick={() => deleteCartItem(item)}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                )
            }) : <h2>Your cart is empty</h2>}

            {ordersList.length > 0 && <PriceSummary />}
        </div>
    )
}
export default FoodCart
