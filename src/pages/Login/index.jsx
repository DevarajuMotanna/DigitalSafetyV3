// import React from 'react';
// import { Link } from 'react-router-dom';
import './login.css';
import mainLogo from '../../assets/maruti_suzuki_medium.svg';


const Login = () => {
    return (
        <div className='row login-page'>
            <div className='col col-md-8 login-bg'>

            </div>
            <div className='col col-md-4 login-form'>
                <div className='row justify-content-center'>
                    <img src={mainLogo} alt='logo' className='login-img' />
                    <form>
                        <div className="row justify-content-center">
                                <form>
                                    <div className='w-100'>
                                        <label htmlFor="username" className="form-label fw-bold">Username</label>
                                        <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                                    </div>
                                    <div className='w-100 mt-3'>
                                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                                    </div>
                                    <button to="/" value="login" style={{color:"white !important"}} type="submit" className="btn btn-primary btn-block w-100 mt-4">Login</button>
                                </form>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default Login