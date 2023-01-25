import React from "react";
import { Routes, Route} from "react-router-dom";
import Restaurant from "../restaurant/restaurant"
import OrderDisplay from "../Rider/ordersDisplay"
import AddFood from "../Admin/AddFoodForm"
import AddRestaurant from "../Admin/AddRestaurant"
import Admin from "../Admin/admin";
import RestaurantData from "../Admin/restautrantData";
import FoodData from "../Admin/foodData";
import RestaurantDetail from "../restaurant/restaurantDetail";

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
            <Route exact path="/" element={<Restaurant />} />
            <Route path="restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
    )
}

const RiderRoute = ()=>{
    return(
        <Routes>
            <Route exact path="/" element={<OrderDisplay />} />
        </Routes>
    )
}

const AdminRoute = ()=>{
    return(                                                                                                 
        <Routes>
            <Route exact path="/" element={<Admin />} />
            {/* <Route path="/add-restaurant" element={<RestaurantData />} />
            <Route path="/add-food" element={<FoodData />} /> */}
        </Routes>
    )
}

export default AuthorizedUsers
