import NavbarComp from "../Components/Navbar/Navbar";
import {useNavigate } from 'react-router-dom'



const Home = () => {
    const navigate = useNavigate()
    const handleNavigationProduct = () =>  {
        navigate("/Products")
    }

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
                        <button className="btn" onClick={() => handleNavigationProduct()}>
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