import React from 'react';

function Login(props) {
    return (
        <div className="container p-5">
            <div className="card">
                <h2 className="text-center my-4">Login</h2>
                <div className="card-body p-4 py-0">
                    <form>
                        <div className="form-group mb-3">
                            <label>Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;