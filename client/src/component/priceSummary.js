import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const PriceSummary = () => {
    const { ordersList } = useSelector(state => state.foodCart)

    const subTotal = ordersList.reduce((a, c) => {
        // console.log('a', a, 'c', c)
        return a + c.foodPrice * c.orderQuantity

    }, 0)

    const minPrice = 1000
    const discount = 5
    console.log(typeof (discount))

    return (
        <div className='total-price'>
            <p>Sub Total: <span>{subTotal}</span></p>
            <p>Discount: <span>{subTotal > 1000 ? `${discount}%` : '0.00'}</span></p>
            <p>Total : <span>{subTotal - (discount / 100) * subTotal}</span></p>

            <button>Proceed to Checkout</button>
        </div>
    )
}
export default PriceSummary
