import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return ( <div >
        <div className = "navigation" >
            <ul >
                <NavLink to = "/" >
                    <li> Home </li> 
                </NavLink>
                <NavLink to = "/Signup" >
                    <li> Sign Up </li> 
                </NavLink> 
                <NavLink to = "/Login" >
                    <li> Login </li> 
                </NavLink> 
                <NavLink to = "/Forum" >
                    <li> Forum </li> 
                </NavLink> 
                <NavLink to = "/Profil" >
                    <li> Profil </li> 
                </NavLink> 
        </ul> 
        </div> 
        </div>
    );
};

export default Navigation;