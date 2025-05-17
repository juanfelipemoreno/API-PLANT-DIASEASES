import { Row, Card, Col, Container, Button } from 'react-bootstrap';
import NavbarComp from "../Components/Navbar/Navbar";
import { addCarList, getCarList, clearCarList } from "../Utils/SendCar";
import { useState, useEffect } from 'react';

const Shopping = ({ list }) => {
    const [shop, setShop] = useState([])
    const [total, setTotal] = useState(0)
    const handleClearShop = () => {
        alert('Tu compra se ha hecho correctamente.');
        clearCarList();
        setShop([])
    }
    useEffect(() => {
        setShop(getCarList())
        if (shop.length > 0) {
            setTotal(shop.reduce((acc, item) => acc + item.price * item.quantity, 0))
        } else {
            setTotal(0)
        }
    })
    return (
        <>
            <NavbarComp />
            <Container>
                    <Col sm="8" className="container">
                        {
                            shop.length > 0 ? shop.map((data, index) => (
                                <Card style={{ width: '18rem', margin: '1rem' }}>
                                    <Card.Body>
                                        <Card.Title>{data.common_name}</Card.Title>
                                        <Card.Text>
                                            <strong>Precio:</strong> ${data.price} <br />
                                            <strong>Cantidad:</strong> {data.quantity}
                                        </Card.Text>
                                        <Button variant="danger">
                                            Eliminar
                                        </Button>
                                    </Card.Body>
                                </Card>

                            )) : <Container>
                                <p>No tienes nada para el carrito</p>
                            </Container>
                        }
                    </Col>
                    <Container sm="8">
                        {total != 0 ? <p>Total: {total}</p> : null}
                        <Button onClick={handleClearShop}>Pagar</Button>
                    </Container>
            </Container>
        </>

    )
}

export default Shopping