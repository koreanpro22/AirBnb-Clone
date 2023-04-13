import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SpotById from "./components/SpotById";
import CreateSpotForm from "./components/CreateSpotForm";
import UserSpots from "./components/UserSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <AllSpots />
          </Route>
          <Route path='/spots/new'>
            <CreateSpotForm />
          </Route>
          <Route path='/spots/owned'>
            <UserSpots owned={true}/>
          </Route>
          <Route path='/spots/:id'>
            <SpotById />
          </Route>
          <Route>
            <h1>404 Page Not Found</h1>
          </Route>
        </Switch>
      }
    </div>
  );
}

export default App;
