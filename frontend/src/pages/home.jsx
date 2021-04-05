import React from "react";
import { Login } from "./login";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavHeader from './navheader'

function Home() {
    return(
        <div>
            <Router>
                <NavHeader/>
                <Switch>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        </div>
    )
}

export default Home;
