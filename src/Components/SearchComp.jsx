import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchComp = () => {

    const letras = Array.from({ length : 26},(_,i) => String.fromCharCode(65 + i));
    
    return(
        <div className="container-center container-search w-100">
            <div className="search-text" >
                <input type="text" title="Ingrese el nombre de la planta" placeholder="Buscar por el nombre de la planta"/>
                <button type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                
            </div>
            <div className="search-option">
                {letras.map((data, index) => (
                    <a className="option" href={`#${data}`}>{data}</a>
                ))}
            </div>
        </div>
    )
}

export default SearchComp;