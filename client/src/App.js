import Login from "./pages/Auth/Login";
import { Routes, BrowserRouter as Router, Route} from "react-router-dom";
import Register from "./pages/Auth/Register";
import Header from "./component/header/header";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AddRestaurant from "./pages/Admin/AddRestaurant";
import Restaurant from "./pages/restaurant/restaurant";

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/restaurant-list" element={<Restaurant />} />
        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
