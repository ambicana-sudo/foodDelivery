import { Routes, Route} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Header from "./component/header/header";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import AuthorizedUsers from "./pages/Auth/authUserRoute";

const App = () => { 
  const {role, token} = useSelector(state=> state.users)
  const [authorizeRole, setAuthorizedUser] = useState(null)
  const setUserRole = ()=>{
      if(token && role === 'user'){
        setAuthorizedUser('user')
      }else if(token && role === 'rider'){
        setAuthorizedUser('rider')
      }else if(token){
        setAuthorizedUser('admin')
      }else{
        setAuthorizedUser(null)
      }
  }

  useEffect(()=>{
    setUserRole()
  }, [role, token])

  return (
    <div className="App">
      {(!authorizeRole) ? 
      <>
        <Header/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage/>}></Route>
        </Routes>
      </> :
      <>
        <Header/>
        <AuthorizedUsers authorizeRole={authorizeRole}/>
      </>
      }
    </div>
  )
};

export default App;

