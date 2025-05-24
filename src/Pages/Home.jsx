
import { useState, useEffect, } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComp from "../Components/Navbar/Navbar";



const Home = () => {
    const navigate = useNavigate()

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
                        <button className="btn-t" onClick={() => navigate('/Products')}>
                        🛒 Explorar Tienda
                        </button>
                        <button className="btn-t" onClick={() => navigate('/IdentifyPlant')}>
                        🔍 Identificar Problemas en tu Planta
                        </button>
                    </div>   
                </div>
            </div>
        </>
    )
}

export default Home;