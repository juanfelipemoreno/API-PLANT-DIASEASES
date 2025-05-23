import React, { useState } from 'react';
import { Button, Card, Modal, ButtonGroup } from 'react-bootstrap';
import CardDetailComp from './CardDetailComp';
import { addCarList, getCarList } from '../Utils/SendCar';

function CardComp({ image = 'holder.js/100px180', title = 'img', description = '', price = 0 }) {
        const [modalShow, setModalShow] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleDetail = () => {
        setModalShow(true);
    };

    const handleAddFloorToList = () => {
        const floor = {
            "common_name": title,
            "image": image,
            "description": description,
            "price": price,
            "quantity": quantity
        };
        addCarList(floor);
        alert('¡Planta añadida al carrito exitosamente!');
        console.log("Productos añadidos", getCarList());
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <Card style={{ width: '300px', height: '440px', minHeight: '440px', display: 'inline-table' }}
            className='shadow-lg card-hover'>
            <Card.Img
                variant="top"
                src={image}
                alt={title}
                style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title><b>{title}</b></Card.Title>
                <Card.Text className="truncate-text">{description}</Card.Text>
                <Card.Text>Precio: ${price}</Card.Text>
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <span className="me-2">Cantidad:</span>
                    <ButtonGroup>
                        <Button variant="outline-secondary" onClick={decreaseQuantity}>-</Button>
                        <Button variant="light" disabled style={{ width: '50px' }}>{quantity}</Button>
                        <Button variant="outline-secondary" onClick={increaseQuantity}>+</Button>
                    </ButtonGroup>
                </div>

                <Button variant="primary" onClick={handleDetail} className="me-2">
                    Detalles
                </Button>
                <Button variant="primary" onClick={handleAddFloorToList}>
                    Añadir al carrito
                </Button>

                <CardDetailComp
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    image={image}
                    title={title}
                    description={description}
                    price={price}
                />
            </Card.Body>
        </Card>
    );
}

export default CardComp;
