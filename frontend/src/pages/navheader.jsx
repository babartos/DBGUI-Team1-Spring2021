import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';


function NavHeader(props) {
    const [loggedIn, setLoggedIn] = useState(false);

    
    return(
        <>
        {console.log(props.status)}
           <div className="pos-f-t">
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-dark">
                        <Link className="text-white ml-3 h4" to="/">MyConstruction</Link>
                        <div className="row mt-3 ml-3">
                            <div id="posts" className="btn-group-vertical pb-4 mr-4">
                                <Link type="button" className="h5 text-white" to="/">Posts</Link>
                                <Link type="button" className="pt-1 text-light" to="/">My Posts</Link>
                                <Link type="button" className="pt-1 text-light" to="/">All Posts</Link>
                            </div>
                            <div id="projects" className="btn-group-vertical pb-4 mr-4">
                                <Link type="button" className="h5 text-white" to="/">Projects</Link>
                                <Link type="button" className="pt-1 text-light" to="/">My Projects</Link>
                                <Link type="button" className="pt-1 text-light" to="/">All Projects</Link>
                            </div>
                            <div id="accounts" className="btn-group-vertical pb-4">
                                <Link type="button" className="h5 text-white" to="/">Accounts</Link>
                                <Link type="button" className="pt-1 text-light" to="/">My Account</Link>
                                <Link type="button" className="pt-1 text-light" to="/">Pro Accounts</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {!(props.status) && <div className="pr-3">
                        <Link type="button" className="btn btn-primary" to="/login">Login</Link>
                        <Link type="button" className="btn btn-dark" to="/signup">Signup</Link>
                    </div>
                    }
                    { (props.status) && <div className="pr-3">
                        <Link type="button" className="btn" to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-house" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                            </svg>
                        </Link>
                        <Link type="button" className="btn" to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-envelope" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                            </svg>
                        </Link>
                        <Link type="button" className="btn btn-dark" to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
                        </Link>
                    </div>
                    } 
                </nav>
            </div>
        </>
    ); 

}

export default NavHeader;