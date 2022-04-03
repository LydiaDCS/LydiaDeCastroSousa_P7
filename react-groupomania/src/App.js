import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Forum from './pages/Forum';
import Login from './pages/Login';
import Profil from './pages/Profil';
import Signup from './pages/Signup';

function App(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element ={<Login/>}/> 
            <Route path="/Login" element ={<Login/>}/>
            <Route path="/Signup" element ={<Signup/>}/> 
            <Route path="/Forum" element ={<Forum/>}/>
            <Route path="/Profil" element ={<Profil/>}/>
        </Routes>
        </BrowserRouter>
        );
}
export default App;