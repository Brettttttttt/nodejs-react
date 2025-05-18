import React, { useState } from 'react';
import '../Components/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Dashboard = () => {
    const [aboutMe, setAboutMe] = useState('');
    const [aboutMeDraft, setAboutMeDraft] = useState('');
    const navigate = useNavigate();

    const handleSaveDraft = (e) => {
        e.preventDefault();
        const sessionToken = localStorage.getItem('sessionToken');
    
        if (!sessionToken) {
            alert('Session token is missing. Please log in again.');
            return;
        }
    
        Axios.post('http://localhost:3001/save-draft', {
            AboutMe: aboutMe,
        }, {
            headers: {
                'x-parse-session-token': sessionToken
            }
        })
        .then((response) => {
            console.log('Response data:', response.data);
            if (response.data.message) {
                alert(response.data.message);
            } else {
                alert('Draft could not be saved. Please try again.');
            }
        })
        .catch((error) => {
            console.error('There was an error saving the draft:', error);
            alert('An error occurred while saving the draft.');
        });
    };
    
    const handleSubmit = () => {
        console.log('Submitted:', aboutMe);
        alert('About Me section submitted');
    };

    const logoutUser = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div>
            <header>
                <h1>My Dashboard</h1>
                <nav>
                    <button className="logout" onClick={logoutUser}>Log Out</button>
                </nav>
            </header>
            <main>
                <div>
                    <h3>Update About Me</h3>
                    <textarea
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                        placeholder="Tell us about yourself..."
                    ></textarea>
                    <div>
                        <button className="save" onClick={handleSaveDraft}>Save as Draft</button>

                    </div>
                    {aboutMeDraft && <p>{aboutMeDraft}</p>}
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Regov Company</p>
            </footer>
        </div>
    );
};

export default Dashboard;
