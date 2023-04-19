import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import { Route, Switch, useLocation } from "react-router-dom";
import React from 'react';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import CreateActivity from './Components/CreateActivity/CreateActivity';
import Activities from './Components/Activities/Activities';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/countries' component={Home} />
          <Route exact path='/countries/:idCountry' component={Detail} />
          <Route path='/activities' component={CreateActivity}/>
          <Route exact path='/view-activities' component={Activities}/>
        </Switch>
      



    </div>
  );
}

export default App;
