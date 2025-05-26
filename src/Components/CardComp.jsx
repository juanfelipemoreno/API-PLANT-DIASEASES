import React, { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import CardDetailComp from './CardDetailComp';
import { addCarList, getCarList } from '../Utils/SendCar';
import { AlertMessage } from './ErrorComp';

function CardComp({ image = 'holder.js/100px180', title = 'img', description = '', price = 0 }) {


    const [modalShow, setModalShow] = useState(false);
    const [error, setError] = useState({ message: '', type: '' });

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
        setError({ message: '!Planta añadida al carrito exitosamente!', type: 'success' });
    }

    return (
        <>
        {error.message ? (<AlertMessage type={error.type} message={error.message} />) : (<div></div>)}
        
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
                <Card.Text className="truncate-text font-serif">{description} </Card.Text>
                <Card.Text className="truncate-text font-serif">Precio: ${price} </Card.Text>
                <div style={{display: 'block ruby'}}>
                    <button className="me-2 mb-2 btn-b font-serif" title="Detalles del producto" onClick={handleDetail}>Detalles</button>
                    <button className="me-2 mb-2 btn-b font-serif" title="Añadir producto" onClick={handleAddFloorToList}>Añadir al carrito</button>
                </div>
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
        </>
    );
}

export default CardComp;