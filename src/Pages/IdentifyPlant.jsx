import NavbarComp from "../Components/Navbar/Navbar";
import planta from '../assets/planta.png'
import iconPlanta from '../assets/icons-planta.png'
import { useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getDataApi } from "../Utils/getDataApi";
import LoadComp from "../Components/LoadComp";
import { AlertMessage } from '../Components/ErrorComp'
import CardComp from "../Components/CardComp";
import { data } from "./data";
import SuggestionsCarComp from "../Components/SuggestionsCarComp";

const IdentifyPlant = () => {
    const myDivRef = useRef(null);

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);   
    const [error, setError] = useState({ message: '', type: '' });   
    const [respons, setRespons] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

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
        setSuggestions(null);
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
        // console.log(data)
        // if(data.result.disease.suggestions !== 'undefined'){
        //     setSuggestions(data.result.disease.suggestions);
        // }
        setUploadProgress(0);
        
        const search = () => {
            getDataApi({
                url: `https://plant.id/api/v3/`,
                endpoint: 'health_assessment',
                params: {
                    images : base64Image,
                    similar_images: true
                },
                token: token,
                get: 'details=local_name,description,url,treatment,classification,common_names,cause'
            }).then(response => {
                console.log(response)
                setLoading(false);
                setError('');
                setRespons(response);
                if(response.result.disease.suggestions !== 'undefined'){
                    setSuggestions(response.result.disease.suggestions);
                }
    
            }).catch(error => {
                setUploadProgress(0);
                setLoading(false);
                setError({ message: error.message, type: 'danger' });
                console.error('Error al obtener los datos:', error.message);
            });
        };

        search();
        
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setUploadProgress(100)
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Limpiar el temporizador

    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToDiv()
        }, 100);

        return () => clearTimeout(timer); // Limpiar el temporizador

    }, [suggestions]);

    const scrollToDiv = () => {
        myDivRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return(
       <>
            <NavbarComp />
            { error.message ? (<AlertMessage type={error.type} message={error.message} />) : (<div></div>)}
            { loading ? (<div className="text-center w-100 vh-100 container-center"><LoadComp percent = {uploadProgress}/></div>) : (

                <div className="container-plant">
                    <div className="plant-box text-white">
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
                                        <div className="text-name-plan">
                                            <p className="truncate-text text">
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
                                {console.log(suggestions)}
                                {suggestions !== null && (
                                    <div ref={myDivRef} className="container py-5">
                                        <h3 className="mb-4">Identificacion de Especies</h3>
                                        {suggestions.map((plant, index) => (
                                            <SuggestionsCarComp key={index} plant={plant} />
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