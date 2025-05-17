import { useState, useEffect } from "react";
import NavbarComp from "../Components/Navbar/Navbar";
import { getDataApi } from '../Utils/getDataApi';
import { AlertMessage } from '../Components/ErrorComp'
import CardComp from "../Components/CardComp";
import { Row, Form, Col, Container, Button } from 'react-bootstrap';
import LoadComp from "../Components/LoadComp";
import {descriptions} from '../constants/constants';

const Products = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ message: '', type: '' });

    const [floors, setFloors] = useState(null);

    const token = "sk-WREH68268bcbdc5f710454"
    const search = (e) => {
        getDataApi({
            url: `https://perenual.com/api/v2/species-list?key=${token}&hardiness=1-13`,
        }).then(response => {
            setError('');
            console.log('Datos',response.data)
            setFloors(response.data);

        }).catch(error => {
            setLoading(false);
            setError({ message: error.message, type: 'danger' });
            console.error('Error al obtener los datos:', error.message);
        });
    };

    useEffect(() => {
        setLoading(true);
        setFloors('');
        search();
        console.log("Descripciones disponibles:", descriptions);
        console.log("Descripcion 1:", descriptions[1].description);

        const timer = setTimeout(() => {

            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Limpiar el temporizador

    }, []);

    return (
        <>
            <NavbarComp />
            {error.message ? (<AlertMessage type={error.type} message={error.message} />) : (<div></div>)}
            {loading ? (<div className="text-center"><LoadComp /></div>) : (
                <>
                    <Container>
                        <Row>
                            <Col sm="8" className="container">
                                <Form className="m-3 col-xs-6">
                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm="6">
                                            <Form.Control type="text" placeholder="Buscar" />
                                        </Col>
                                        <Col sm="5">
                                            <Button variant="primary" onClick={search}>
                                                Buscar
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                        <Row xs={1} md={4} className="g-4">
                            {floors.length > 0 ? floors.map((data, index) => (
                                
                              data.default_image != null ? <Col key={index} md={4} className="custom-col">
                                    <CardComp
                                        image={data.default_image != null ? data.default_image.original_url : ""}
                                        title={data.common_name}
                                        description= { descriptions[index].description}
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