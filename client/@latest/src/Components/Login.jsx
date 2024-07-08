import React, {useEffect, useState}from 'react';
import '../Components/Login.css';
import '../../src/App.scss';

import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';

import video from '../LoginAssets/rainforest.mp4';
import logo from '../LoginAssets/pic.jpg';

import {FaUserShield} from 'react-icons/fa';
import {BsFillShieldLockFill} from 'react-icons/bs';
import {AiOutlineSwapRight} from 'react-icons/ai';
const Login = () => {
    
    const [loginUserName, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigateTo = useNavigate();

    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    const loginUser = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/login',{
            LoginUserName: loginUserName,
            LoginPassword: loginPassword,
        }).then((response) => {
            console.log();

            if(response.data.message  || loginUserName === '' || loginPassword === ''){
                navigateTo('/');
                setLoginStatus("Credential Don't Exist!");
            }
            else{
                localStorage.setItem('user', JSON.stringify(response.data));
                navigateTo('/dashboard');
            }
        })

    }

    useEffect(() => {
        if(loginStatus !== ''){
            setStatusHolder('showMessage');
            setTimeout(() => {
                setLoginStatus('');
                setStatusHolder('message');
            }, 4000);
        }
    }, [loginStatus])

    const onSubmit =() =>{
        setLoginUsername('');
        setLoginPassword('');
    }

    return (
        // JSX code for your Login component
        
            <div className='loginPage flex'>
                <div className="container flex">
                    <div className="videoDiv">
                        <video src={video} autoPlay muted loop></video>
                    

                    <div className="textDiv">
                        <h2 className='title'>Create and Sell Extraordinary Products</h2>
                        <p>Adopt the peace of natural</p>
                    </div>

                    <div className="footerDiv flex">
                        <span className="text">Don't have an account?</span>
                        <Link to={'/register'}>
                            <button className='btn'>Register</button>
                        </Link>
                    </div>
                    </div>

                    <div className="formDiv flex">
                        <div className="headerDiv">
                            <img src={logo} alt='Logo Image'/>
                            <h2>Welcome Back</h2>
                        </div>

                        <form action='' className='form grid' onSubmit={onSubmit}>
                            <span className={statusHolder}>{loginStatus}</span>

                            <div className="inputDiv">
                                <label htmlFor='username'>Username</label>
                                <div className='input flex'>
                                    <FaUserShield className="icon"/>
                                    <input type='text' id='username' placeholder='Enter Username'
                                    onChange={(event)=>{
                                        setLoginUsername(event.target.value);
                                    }

                                    }/>
                                </div>
                            </div>

                            <div className="inputDiv">
                                <label htmlFor='password'>Password</label>
                                <div className='input flex'>
                                    <BsFillShieldLockFill  className="icon"/>
                                    <input type='password' id='password' placeholder='Enter Password'
                                    onChange={(event)=>{
                                        setLoginPassword(event.target.value);
                                    }

                                    }/>
                                </div>
                            </div>

                            <button type='submit' className='btn flex' onClick={loginUser}>
                                <span>Login</span>
                                <AiOutlineSwapRight className="icon"/>
                            </button>

                            <span className='forgotPassword'>
                                Forgot Your Password? <a href=''>Click here</a>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        
    )
}

export default Login;