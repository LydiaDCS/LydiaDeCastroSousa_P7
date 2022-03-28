import React from 'react';
import "../styles/Login.css"
import Navigation from '../components/Navigation';
import { NavLink } from 'react-router-dom';

const Login = () => {
    return ( < div >
        <
        Navigation / >
        <
        h1 > Groupomania < /h1>

        <
        div className = 'form' >
        <
        label
        for = "email" > Email: < /label> <
        input type = "email"
        name = "email" / >
        <
        label
        for = "password" > Mot de passe: < /label> <
        input type = "text"
        name = "password" / >


        <
        button > Submit < /button> <
        /div>  <
        /div>
    );
};

export default Login;