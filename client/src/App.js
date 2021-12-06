import './App.css';
import LandingPage from "./components/LandingPage.jsx"
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SearchBar from "./components/SearchBar"
import Home from "./components/Home.jsx"
import CreateRecipe from './components/CreateRecipe.jsx';
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      
      <Route path="/create" component={CreateRecipe}/>
      <Route path = "/product/:id" component= {Detail}/>
      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
