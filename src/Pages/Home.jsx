import { useState, useEffect } from "react";
import NavbarComp from "../Components/Navbar/Navbar";

import {Row,Form,Col,Container,Button} from 'react-bootstrap';


const Home = () => {

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
                        <button className="btn" onClick={() => alert('Ir a la tienda')}>
                        🛒 Explorar Tienda
                        </button>
                        <button className="btn secondary" onClick={() => alert('Ir al detector de problemas')}>
                        🔍 Identificar Problemas en tu Planta
                        </button>
                    </div>   
                </div>
            </div>
        </>
    )
}

export default Home;