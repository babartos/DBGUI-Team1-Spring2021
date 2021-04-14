import React, { useState } from 'react';

export const AccountSearch = props => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    
    return <>
        <div className="row">
            <div className="col-6">
                <div className="form-group">
                    <label htmlFor="search_name">Name</label>
                    <input type="text"
                        id="search_name"
                        className="form-control"
                        value={ name }
                        onChange= { event => setName(event.target.value) } />
                </div>
            </div>
            <div className="col-6">
                <div className="form-group">
                        <label htmlFor="search_email">Email</label>
                        <input type="text"
                            id="search_email"
                            className="form-control"
                            value={ email }
                            onChange={ event => setEmail(event.target.value) } />
                </div>
            </div>
            <div className="col-12">
                <button type="button" className="btn btn-primary btn-block"
                        onClick={ () => props.onSearch({ name, email }) }>Search</button>
            </div>
        </div>
    </>
}