import React from 'react';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Favorites from './Components/Favorites';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <div>
        <Route exact={true} path='/' render={() =>
          <>
            <Navbar />
            <Home />
            
          </>
        } />
        <Route exact={true} path='/favorites' render={() =>
          <>
            <Navbar />
            <Favorites />
          </>
        } />
      </div>
    </Router>
  );
}

export default App;
