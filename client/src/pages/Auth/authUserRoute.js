import React from "react";
import { Routes, Route} from "react-router-dom";
import Restaurant from "../restaurant/restaurant"
import OrderDisplay from "../Rider/ordersDisplay"
import AddFood from "../Admin/AddFoodForm"
import AddRestaurant from "../Admin/AddRestaurant"
import Admin from "../Admin/admin";

const AuthorizedUsers = (props)=>{
   if(props.authorizeRole === 'user'){
    return <UserRoute/>
   }else if(props.authorizeRole === 'rider'){
    return <RiderRoute/>
   }else if(props.authorizeRole === 'admin'){
    return <AdminRoute/>
   }
}

const UserRoute = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Restaurant />} />
        </Routes>
    )
}

const RiderRoute = ()=>{
    return(
        <Routes>
            <Route path="/" element={<OrderDisplay />} />
        </Routes>
    )
}

const AdminRoute = ()=>{
    return(                                                                                                 
        <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/add-restaurant" element={<AddRestaurant />} />
            <Route path="/add-food" element={<AddFood />} />
        </Routes>
    )
}

export default AuthorizedUsers
