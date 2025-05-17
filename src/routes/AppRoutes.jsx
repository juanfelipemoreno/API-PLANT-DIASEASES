import { useContext, React} from 'react';
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from '../Pages/Home';
import Product from '../Pages/Products';


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Home" element={<Home/>}  />
                <Route path='/Products' element={<Product />} />
                <Route path="*" element={<div><h1>404 NOT FOUND</h1></div>} />
            </Routes>
        </BrowserRouter>
    )
}