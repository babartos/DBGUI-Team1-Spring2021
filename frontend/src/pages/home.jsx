import React from "react";
import { Login } from "./login";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Home() {
    return(
        <div>
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        </div>
    )
}

export default Home;
