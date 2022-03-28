import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Forum from './pages/Forum';
import Login from './pages/Login';
import Profil from './pages/Profil';
import Signup from './pages/Signup';



function App() {
    return ( <
        BrowserRouter >
        <
        Routes >
        <
        Route path = "/Forum"
        element = { < Forum / > }
        /> <
        Route path = "/Login"
        element = { < Login / > }
        /> <
        Route path = "/Profil"
        element = { < Profil / > }
        /> <
        Route path = "/Signup"
        element = { < Signup / > }
        /> <
        /Routes> <
        /BrowserRouter>
    );
}
export default App;