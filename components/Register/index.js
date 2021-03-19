import React, { useState } from 'react';

const Register = (props) => {
    const [user, setUser] = useState({ state: 'registered' });

    async function registerUser(e) {
        e.preventDefault();
        if (user.password && user.confirmPass && user.password === user.confirmPass) {
            const url = `http://localhost:3000/sign_in`;
            const options = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            };
            const response = await fetch(url, options); // creating new movie
            const theatre = await response.json();
        }
    }

    return (
        <div className="container border border-secondary" style={{ width: '500px', 'marginTop': '8em' }}>
            <form onSubmit={(e) => registerUser(e)}>
                <div className="ml-2 mt-4 row">
                    <p className="col-sm">
                        First name
            </p>
                    <input className="ml-5 mb-3 mr-5 col-sm" type="text" onChange={(e) => setUser({ ...user, firstName: e.target.value })} required></input>
                </div>
                <div className="ml-2 mt-2 row">
                    <p className="col-sm">
                        Last name
            </p>
                    <input className="ml-5 mb-3 mr-5 col-sm" type="text" onChange={(e) => setUser({ ...user, lastName: e.target.value })} required></input>
                </div>
                <div className="ml-2 mt-2 row">
                    <p className="col-sm">
                        Email
            </p>
                    <input className="ml-5 mb-3 mr-5 col-sm" type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} required></input>
                </div>
                <div className="ml-2 mt-2 row">
                    <p className="col-sm">
                        Password
            </p>
                    <input className="ml-5 mb-3 mr-5 col-sm" type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} required></input>
                </div>
                <div className="ml-2 mt-2 row">
                    <p className="col-sm">
                        Confirm Password
            </p>
                    <input className="ml-5 mb-3 mr-5 col-sm" type="password" onChange={(e) => setUser({ ...user, confirmPass: e.target.value })} required></input>
                </div>
                {user.password && user.confirmPass && user.password !== user.confirmPass ?
                    <p className="text-danger"> * Please password does not match</p>
                    : null
                }
                <div className="m-2 row d-flex justify-content-center">
                    <button type="submit" className="w-25 btn btn-success">Register</button>
                </div>
            </form>
        </div>
    )
};

export default Register;