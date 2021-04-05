import React from 'react'
import { Link, Redirect } from 'react-router-dom';

function NavHeader(props) {
        return(
            <h1 className="h1 bg-primary row p-3 pl-4">MyConstruction
                <div className="pl-2">
                    <Link type="button" className="btn btn-primary" to="/">Home</Link>
                </div>
                <div className="pl-2">
                    <Link type="button" className="btn btn-primary" to="/login">Login/Signup</Link>
                </div>
            </h1>

    ); 

}

export default NavHeader;