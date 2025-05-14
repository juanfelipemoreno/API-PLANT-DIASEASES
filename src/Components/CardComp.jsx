import React, { useState } from 'react';
import {Button,Card,Modal} from 'react-bootstrap';
import CardDetailComp  from './CardDetailComp';

function CardComp({ image= 'holder.js/100px180', title = 'img', description = ''}) {

    const [modalShow, setModalShow] = useState(false);

    const handleDetail = (e) => {
        setModalShow(true)
    };
    return (
        <Card style={{ width: '300px', Height: '400px', minHeight: '400px', display: 'inline-table'}} 
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
                <Button variant="primary" onClick={handleDetail}>
                    Detalles
                </Button>

                <CardDetailComp
                     show={modalShow}
                     onHide={() => setModalShow(false)}
                     image={image}
                     title={title}
                     description={description}
                />
            </Card.Body>
        </Card>
    );
}

export default CardComp;