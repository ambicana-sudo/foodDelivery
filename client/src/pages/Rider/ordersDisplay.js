import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TodoDeliveryList from '../../component/Rider/todoDeliveryList'

const OrderDisplay = ()=>{
    const [users, setUsers] = useState([])
    const {address} = useSelector(state => state.users)

    const fetchUsers = async()=>{
        const response = await fetch('http://localhost:3000/register')   
        const data = await response.json()
        
        console.log(data)
        if(data){
            setUsers(data.userList)
        }
    }

    const filterUsers = users.filter((user)=>{
        return address === user.address && user.role === 'user'
    })
    console.log(filterUsers, address)

    useEffect(()=>{
        fetchUsers()
    }, [])


    return(
        
        <>
            <div id="rider" className="top_section">
                <div className='container'>
                    <div className='delivery_request'>
                        <h2 className='pg_title'>Delivery Requests</h2>
                         <TodoDeliveryList users={filterUsers} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrderDisplay