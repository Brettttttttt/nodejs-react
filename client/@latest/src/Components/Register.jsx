import React, {useState}from 'react';
import '../Components/Register.css';
import '../../src/App.scss';

import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';


import video from '../LoginAssets/rainforest.mp4';
import logo from '../LoginAssets/pic.jpg';

import {FaUserShield} from 'react-icons/fa';
import {BsFillShieldLockFill} from 'react-icons/bs';
import {AiOutlineSwapRight} from 'react-icons/ai';
import {MdMarkEmailRead} from 'react-icons/md';
const Register = () => {
    // Your component logic goes here


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');   
    const navigateTo = useNavigate();

    const createUser = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/register',{
            Email: email,
            Username: username,
            Password: password,
        }).then(() => {
            navigateTo('/');

            setEmail('');
            setUsername('');
            setPassword('');
        })

    }

    return (
        // JSX code for your Login component
        
            <div className='registerPage flex'>
                <div className="container flex">
                    <div className="videoDiv">
                        <video src={video} autoPlay muted loop></video>
                    

                    <div className="textDiv">
                        <h2 className='title'>Create and Sell Extraordinary Products</h2>
                        <p>Adopt the peace of natural</p>
                    </div>

                    <div className="footerDiv flex">
                        <span className="text">Have an account?</span>
                        <Link to={'/'}>
                            <button className='btn'>Login</button>
                        </Link>
                    </div>
                    </div>

                    <div className="formDiv flex">
                        <div className="headerDiv">
                            <img src={logo} alt='Logo Image'/>
                            <h2>Let Us Know You!</h2>
                        </div>

                        <form action='' className='form grid'>


                            <div className="inputDiv">
                                <label htmlFor='email'>Email</label>
                                <div className='input flex'>
                                    <MdMarkEmailRead className="icon"/>
                                    <input type='email' id='email' placeholder='Enter Email'
                                    onChange={(event)=>{
                                        setEmail(event.target.value);
                                    }

                                    }/>
                                </div>
                            </div>

                            <div className="inputDiv">
                                <label htmlFor='username'>Username</label>
                                <div className='input flex'>
                                    <FaUserShield className="icon"/>
                                    <input type='text' id='username' placeholder='Enter Username'
                                    onChange={(event)=>{
                                        setUsername(event.target.value);
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
                                        setPassword(event.target.value);
                                    }
                                    }/>
                                </div>
                            </div>

                            <button type='submit' className='btn flex' onClick={createUser}>
                                <span>Register</span>
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

export default Register;