import NavbarComp from "../Components/Navbar/Navbar";


const IdentifyPlant = () => {

    return(
       <>
            <NavbarComp />
            <div className="container-plant">
                <header className="header">
                    <h1>🌿 Identifiquemos tu planta y sus problemas</h1>
                    <p>Agrega desde tu biblioteca la imagen o arrastrala aqui.</p>
                </header>
                <div>
                    <div className="button-import">
                        <input type="file"/>
                    </div>   
                </div>
            </div>
       </> 
    )
}

export default IdentifyPlant;