import React from 'react';
import Navigation from '../components/Navigation';

const Signup = () => {
    return ( <
        div >
        <
        Navigation / >
        <
        h1 > Groupomania < /h1>

        <
        div className = 'form' >
        <
        label
        for = "firstName" > Prénom: < /label> <
        input type = "text"
        name = "firstName" / >
        <
        label
        for = "lastName" > Nom: < /label> <
        input type = "text"
        name = "lastName" / >
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
        /div> 

        <
        /div>
    );
};

export default Signup;