import React, { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import CardDetailComp from './CardDetailComp';
import { addCarList, getCarList } from '../Utils/SendCar';

function IdentifyResComp({ image = 'holder.js/100px180', title = 'img', description = '', price = 0}) {


    const [modalShow, setModalShow] = useState(false);

    const handleDetail = (e) => {
        setModalShow(true)
    };

    const handleAddFloorToList = () => {
        const floor = {
            "common_name": title,
            "image": image,
            "description": description,
            "price": price
        }
        addCarList(floor);
        alert('!Planta añadida al carrito exitosamente!')
        console.log("Productos añadidos", getCarList())
    }

    return (
        <Card style={{ width: '300px', Height: '400px', minHeight: '400px', display: 'inline-table' }}
            className='shadow-lg card-hover'>
            <Card.Img
                variant="top"
                src={image}
                alt={title}
                style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title><b>{title}</b></Card.Title>
                <Card.Text className="truncate-text">{description} </Card.Text>
                 <Card.Text className="truncate-text">Precio: ${price} </Card.Text>
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
                    price = {price}
                />
            </Card.Body>
        </Card>
    );
}

export default IdentifyResComp;