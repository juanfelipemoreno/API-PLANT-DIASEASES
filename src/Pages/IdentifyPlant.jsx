import NavbarComp from "../Components/Navbar/Navbar";
import planta from '../assets/planta.png'
import iconPlanta from '../assets/icons-planta.png'
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getDataApi } from "../Utils/getDataApi";
import LoadComp from "../Components/LoadComp";
import { AlertMessage } from '../Components/ErrorComp'
import CardComp from "../Components/CardComp";

const IdentifyPlant = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);   
    const [error, setError] = useState({ message: '', type: '' });   
    const [respons, setRespons] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);

    function importImage(e){
        const selectedFile = e.target.files[0]
        if(selectedFile){
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    }

    function clearImg(){
        setFile(null);
        setPreview(null);
    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
    });

    async function uploadImage(){
        const base64Image = await toBase64(file);
        
        setLoading(true);
        const token = "CiC37ULOoRmX0yO6pWNzW9HU0qI3Zcn1PXVwRm7yoUUbcOu8k6"
        const search = () => {
            getDataApi({
                url: `https://plant.id/api/v3/`,
                endpoint: 'health_assessment',
                params: {
                    images : base64Image,
                    similar_images: true
                },
                token: token
            }).then(response => {
                setLoading(false);
                setError('');
                setRespons(response);
                if(response.result.disease.suggestions !== 'undefined'){
                    setSuggestions(response.result.disease.suggestions);
                }
    
            }).catch(error => {
                setLoading(false);
                setError({ message: error.message, type: 'danger' });
                console.error('Error al obtener los datos:', error.message);
            });
        };

        search();
        
    }

    return(
       <>
            <NavbarComp />
            { error.message ? (<AlertMessage type={error.type} message={error.message} />) : (<div></div>)}
            { loading ? (<div className="text-center"><LoadComp/></div>) : (

                <div className="container-plant">
                    <div className="plant-box">
                        <div>
                            <header className="header">
                                <h1>🌿 Identifiquemos tu planta y sus problemas</h1>
                                <p>Agrega desde tu biblioteca la imagen o arrastrala aqui.</p>
                            </header>
                            <div className="container-file">
                                {file && (
                                    <>
                                    <div className="container-img">
                                        <div className="img">
                                            <img src={preview} alt="Planta" />
                                        </div>
                                        <div className="close">
                                            <FontAwesomeIcon icon={faXmark} onClick={clearImg} />
                                        </div>
                                        <div>
                                            <p className="truncate-text">
                                                <b>Nombre: </b><span>{file.name}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="container-upload">
                                        <button className="btn-t" onClick={uploadImage}>Analizar Imagen</button>
                                    </div>
                                    </>
                                )}
                                {!file && (
                                    <div className="button-import" style={{ '--icon-url': `url(${iconPlanta})` }}>
                                        <input type="file" name="upload-file" onChange={importImage}/>
                                    </div>
                                )}
                                {console.log(suggestions.length)}
                                {suggestions && (
                                    <div className="grid-card"> 
                                        {Array.from({ length: 1 }).map((_, idx) => (
                                            Array.isArray(suggestions) && suggestions.length > 0 && suggestions.map((data, index)=>(
                                                <div key={index} >
                                                    <CardComp 
                                                        image = {data.hdurl}
                                                        title = {data.title}
                                                        description = {data.explanation}
                                                    />
                                                </div> 
                                            ))
                                        ))} 
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
       </> 
    )
}

export default IdentifyPlant;