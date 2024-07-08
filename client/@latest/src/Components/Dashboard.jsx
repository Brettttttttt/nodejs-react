import React, { useState, useEffect } from 'react';
import '../Components/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Dashboard = () => {
    const [aboutMe, setAboutMe] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setAboutMe(storedUser.about_me_draft || '');
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleSaveDraft = async () => {
        if (!user || !user.username) {
            alert('User data is missing. Please log in again.');
            return;
        }
    
        const payload = {
            username: user.username, // Ensure this matches your backend
            about_me_draft: aboutMe,
        };
    
        console.log('Sending payload:', payload);
    
        try {
            const response = await Axios.post('http://localhost:3001/save-draft', payload);
            alert(response.data.message);
        } catch (error) {
            console.error('Error response:', error.response);
            alert('An error occurred while saving the draft.');
        }
    };

    const handleSubmit = () => {
        console.log('Submitted:', aboutMe);
        alert('About Me section submitted');
    };

    const logoutUser = () => {
        localStorage.removeItem('user'); // Clear user data
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
                        <button onClick={handleSaveDraft}>Save as Draft</button>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Regov Company</p>
            </footer>
        </div>
    );
};

export default Dashboard;
