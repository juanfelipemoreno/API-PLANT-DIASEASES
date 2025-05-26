import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const SearchComp = ({setfilter, setTypeFilter}) => {
    
    const [filter, setFilter] = useState(null);

    const letras = Array.from({ length : 26},(_,i) => String.fromCharCode(65 + i));
    
    const handleFilter = (data) => {
        if(data == filter){
            setfilter(null); 
            setFilter(null);
        }else{
            setfilter(data); 
            setFilter(data); 
            
        }
        setTypeFilter(1);
        
    }

    return(
        <div className="container-center container-search p-4">
            <div className="search-text" >
                <input type="text" onChange={(e) => setfilter(e.target.value)}title="Ingrese el nombre de la planta" placeholder="Buscar por el nombre de la planta"/>
                <button type="submit" onClick={() => {setfilter(filter); setTypeFilter(2);}}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                
            </div>
            <div className="search-option">
                {letras.map((data, index) => (
                    <a className={`option ${filter === data ? 'active' : ''}`} onClick={(e) => handleFilter(data)}>{data}</a>
                ))}
            </div>
        </div>
    )
}

export default SearchComp;