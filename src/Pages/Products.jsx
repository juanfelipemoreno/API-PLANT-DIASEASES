import { useState, useEffect } from "react";
import NavbarComp from "../Components/Navbar/Navbar";
import { getDataApi } from '../Utils/getDataApi';
import { AlertMessage } from '../Components/ErrorComp'
import CardComp from "../Components/CardComp";
import { Row, Form, Col, Container, Button } from 'react-bootstrap';
import LoadComp from "../Components/LoadComp";
import {descriptions} from '../constants/constants';
import SearchComp from "../Components/SearchComp";

const Products = () => {

    const [loading, setLoading] = useState(true);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState({ message: '', type: '' });

    const [floors, setFloors] = useState([]);
    const [floorsR, setFloorsR] = useState([]);

    const [typeFilter, setTypeFilter] = useState(null);
    const [filter, setfilter] = useState(null);

    const token = "sk-ldvt682e9e0c28ed110580"
    const search = () => {
        getDataApi({
            url: `https://perenual.com/api/v2/species-list?key=${token}&hardiness=1-13`,
            method: 'GET',
        }).then(response => {
            setError('');
            console.log('Datos',response.data)
            setFloors(response.data);
            setFloorsR(response.data);

        }).catch(error => {
            setUploadProgress(0);
            setLoading(false);
            setError({ message: error.message, type: 'danger' });
            console.error('Error al obtener los datos:', error.message);
        });
    };

    useEffect(() => {
        setLoading(true);
        setFloors('');
        setFloorsR('');
        search();

        const timer = setTimeout(() => {
            setLoading(false);
            setUploadProgress(100)
        }, 1000);

        return () => clearTimeout(timer);

    }, []);

    useEffect(() => {
        console.log(floors)
    }, [floors]);

    useEffect(() => {
        let daresultados = '';
        if(filter != undefined && floors != undefined && Array.isArray(floors)){
            if(typeFilter == 1){
                daresultados = floors?.filter(item =>
                    item.common_name?.toLowerCase().startsWith(filter.toLowerCase())
                );
            }else{
                daresultados = floors?.filter(item =>
                    item.common_name?.toLowerCase().includes(filter.toLowerCase())
                );
            }
        }
        console.log(daresultados)
        setFloorsR(daresultados);

    }, [filter,typeFilter]);

    return (
        <>
            <NavbarComp />
            {error.message ? (<AlertMessage type={error.type} message={error.message} />) : (<div></div>)}
            {loading ? (<div className="text-center w-100 vh-100 container-center"><LoadComp percent = {uploadProgress}/></div>) : (
                <>
                <SearchComp setfilter = {setfilter} setTypeFilter={setTypeFilter}/>
                    <Container className="my-4">
                        <Row>
                            <h3 className="mb-4">Plantas</h3>
                        </Row>

                        <Row xs={1} md={4} className="g-4">
                            {floorsR.length > 0 ? floorsR.map((data, index) => (
                                
                              data.default_image != null ? <Col key={index} xs={12} sm={6} md={6} lg={4} className="custom-col">
                                    <CardComp
                                        image={data.default_image != null ? data.default_image.original_url : ""}
                                        title={data.common_name}
                                        description= { descriptions[index].description}
                                        price={ descriptions[index].price_cop}
                                    />
                                </Col> : 
                                null
                            )) 
                                : <Container></Container>}
                        </Row>
                    </Container>
                </>
            )}
        </>
    )
}

export default Products;