import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ListUserComponent from './components/ListUserComponent';
import AddUserComponent from './components/AddUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import AddNewsForm from './components/AddNewsForm';
import ListNewsComponent from "./components/ListNewsComponent";
import ViewNewsDetailsForm from './components/ViewNewsDetailsForm';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AnimoSpotlight from './components/AnimoSpotlight';
import Istorya from './components/IstoryaComponent';
import Aranetalk from './components/AranetalkComponent';
import Balitaraneta from './components/Balitaraneta';
import SilidAralneta from './components/SilidAralnetaComponent';
import AnimoVodCast from './components/AnimoVodCastComponent';
import Unauthorized from './components/Unauthorized';
import axios from 'axios';

function App() {
    const [authenticated, setAuthenticated] = useState(null); // Change initial state to null
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        if (token && userRole) {
            setAuthenticated(true);
            setRole(userRole);
        } else {
            setAuthenticated(null); // Set authenticated to false if no token is found
        }
    }, []);

    function handleLogin(token, userRole) {
        // Store the token and role in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);
        console.log("Logged in with token:", token, "and role:", userRole);

        // Set Axios default headers to include the token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Set authenticated state to true
        setAuthenticated(true);
        // Set role state
        setRole(userRole);
    }

    return (
        <Router>
            <div>
                <Route path="/" exact component={HomePage} />
                <Route path="/animo-spotlight" component={AnimoSpotlight} />
                <Route path="/istorya" component={Istorya} />
                <Route path="/aranetalk" component={Aranetalk} />
                <Route path="/balitaraneta" component={Balitaraneta} />
                <Route path="/silid-aralneta" component={SilidAralneta} />
                <Route path="/animo-vodcast" component={AnimoVodCast} />
                <Route path="/login" component={() => <Login onLogin={handleLogin} />} />
                {authenticated === null ? ( // Render a loading state or empty div while checking authentication status
                 <div> </div>
                ) : authenticated ? (
                    <>
                        <Route path="/news" component={ListNewsComponent} />
                        <Route path="/add-news/:id" component={AddNewsForm} />
                        <Route path="/view-news/:id" component={ViewNewsDetailsForm} />
                        {role === 'ADMIN' && (
                            <>
                                <Route path="/users" component={ListUserComponent} />
                                <Route path="/add-user/:id" component={AddUserComponent} />
                                <Route path="/view-user/:id" component={ViewUserComponent} />
                            </>
                        )}
                        {
                        <div> </div>
                    
                    }

                    </>
                ) : (
                    <Redirect to="/unauthorized" />
                )}
                <Route path="/unauthorized" component={Unauthorized} />
            </div>
        </Router>
    );
}

export default App;
