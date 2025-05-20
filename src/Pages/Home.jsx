import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComp from "../Components/Navbar/Navbar";

import {Row,Form,Col,Container,Button} from 'react-bootstrap';


const Home = () => {

    const navigate = useNavigate();

    return (
        <>
            <NavbarComp />
            <div className="welcome">
                <div className="background-layer"></div>
                <div className="welcome-container">
                    <header className="welcome-header">
                        <h1>🌿 Bienvenido a GreenHelp</h1>
                        <p>Tu tienda de confianza para plantas y soluciones inteligentes para cuidarlas.</p>
                    </header>
                    <div className="welcome-buttons">
                        <button className="btn" onClick={() => navigate('/Products')}>
                        🛒 Explorar Tienda
                        </button>
                        <button className="btn secondary" onClick={() => navigate('/IdentifyPlant')}>
                        🔍 Identificar Problemas en tu Planta
                        </button>
                    </div>   
                </div>
            </div>
        </>
    )
}

export default Home;