import React from 'react'
import { Link, Redirect } from 'react-router-dom';

function NavHeader(props) {
        return(
            <h1 className="bg-primary row p-3 pl-4">MyConstruction
                <div className="col btn-col">
                    <div className="">
                        <Link type="button" className="btn btn-primary" to="/login">Login/Signup</Link>
                    </div>
                </div>
            </h1>

    ); 

}

export default NavHeader;