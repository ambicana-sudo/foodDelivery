import { createSlice } from "@reduxjs/toolkit";
import { message } from 'antd';

export const initialState = {
    ordersList: [],
    totalPrice: '',
}

const cartSlice = createSlice({
    name: 'foodCart',
    initialState,
    reducers: {
        setOrdersList: (state, actions) => {
            // console.log(actions.payload)
            // state.ordersList.push(actions.payload)
            const productExist = state.ordersList.find(item => item._id === actions.payload._id)
            // if (productExist) {
            //     alert('exist')
            // }
            state.ordersList = productExist ? state.ordersList : [...state.ordersList, actions.payload]
        },
        increaseOrderQuantity: (state, actions) => {
            // console.log(actions.payload)
            state.ordersList.map((item, id) => {
                if (item._id === actions.payload._id) {
                    return state.ordersList[id].orderQuantity += 1
                }
            })
        },
        decreaseOrderQuantity: (state, actions) => {
            // console.log(actions.payload)
            state.ordersList.map((item, id) => {
                if (item._id === actions.payload._id && item.orderQuantity > 1) {
                    return state.ordersList[id].orderQuantity -= 1
                }
            })
        },
        deleteOrderItem: (state, actions) => {
            const newOrderList = state.ordersList.filter((cartitem) => {
                return cartitem._id !== actions.payload._id
            })

            message.error(`Deleted ${actions.payload.foodName} from your order`)

            state.ordersList = newOrderList
        },
        // setTotalPrice: (state, actions) => {
        //     const orderTotal = state.ordersList.reduce((a, c) => {
        //         console.log('dcd', a, c)
        //         return a + c.foodPrice * c.orderQuantity
        //     }, 0)
        //     state.totalPrice = orderTotal
        // }
    }
})

export const { setOrdersList, increaseOrderQuantity, decreaseOrderQuantity, deleteOrderItem } = cartSlice.actions;
export default cartSlice.reducer