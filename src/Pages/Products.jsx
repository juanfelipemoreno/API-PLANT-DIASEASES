import { useState, useEffect } from "react";
import NavbarComp from "../Components/Navbar/Navbar";
import { getDataApi } from '../Utils/getDataApi';
import { AlertMessage } from '../Components/ErrorComp'
import CardComp from "../Components/CardComp";
import {Row,Form,Col,Container,Button} from 'react-bootstrap';
import LoadComp from "../Components/LoadComp";

const Products = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ message: '', type: '' });

    const [astronomy, setAstronomy] = useState(null);
    const [endpoint, setEndpoint] = useState('apod');

    const [count, setCount] = useState(10);

    const search = (e) => {
        console.log(count)
        getDataApi({
            url: 'https://api.nasa.gov/planetary/',
            endpoint: endpoint,
            params: { 
                api_key: 'Vqk0sTiib2O8zY10OPJC1KuLmmi2xO3CzxddGAe2',
                count : count
            }
        }).then(response => {
            setError('');
            setAstronomy(response);
            
        }).catch(error => {
            setLoading(false);
            setError({ message: error.message, type: 'danger' });
            console.error('Error al obtener los datos:', error.message);
        });
    };

    useEffect(() => {
        setLoading(true);
        setAstronomy('');
        search();
        const timer = setTimeout(() => {
            
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Limpiar el temporizador
        
    }, []);

    return (
        <>
            <NavbarComp />
            { error.message ? (<AlertMessage type={error.type} message={error.message} />) : (<div></div>)}
            { loading ? (<div className="text-center"><LoadComp/></div>) : (
                <>
                <Container>
                    <Row>
                        <Col sm="8" className="container">
                            <Form className="m-3 col-xs-6">
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Col sm="5">
                                        <Form.Control type="text" placeholder="Buscar" />
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control type="number" placeholder="Cantidad" 
                                            onChange={(e) =>
                                                Number(e.target.value) > 0 ? ( 
                                                    setCount(Number(e.target.value))
                                                ) : setCount(10)
                                            }/>
                                    </Col>
                                    <Col sm="1">
                                        <Button variant="primary" onClick={search}>
                                            Buscar
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    
                    <Row xs={1} md={4} className="g-4">
                        {Array.from({ length: 1 }).map((_, idx) => (
                            Array.isArray(astronomy) && astronomy.length > 0 && astronomy.map((data, index)=>(
                                data.media_type == 'image' && (
                                    <Col key={index} md={4} className="custom-col">
                                        <CardComp 
                                            image = {data.hdurl}
                                            title = {data.title}
                                            description = {data.explanation}
                                        />
                                    </Col>   
                                )
                            ))
                        ))}    
                    </Row>
                </Container>
                </>
            )}
        </>
    )
}

export default Products;