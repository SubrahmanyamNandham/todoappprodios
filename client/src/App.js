import {BrowserRouter,Route,Switch} from "react-router-dom"
import Todo from "./components/Todo"
import Login from "./components/Login"
import Home from "./components/Home"
import './App.css';

//import SignUp from "./components/SignUp";


const App=() =>{

  return (
   
      <BrowserRouter>
      <Switch>
        <Route path="/todo" exact component={Todo}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/" exact component={Home}/>
      </Switch>
      
      </BrowserRouter>
   
  
  
  )
}

export default App;
