import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ButtonGroup } from 'react-bootstrap';
import { addCarList, getCarList } from '../Utils/SendCar';

export default function CardDetailComp({ show, onHide, image, title, description, price }) {
    const [quantity, setQuantity] = useState(1);
    const [modalShow, setModalShow] = useState(false);

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
    <div>
    <Modal show={show} onHide={onHide}
      size="lg" aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"><b>{title}</b></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="container-fluid">
      <div className="row">
          <div className="col-md-6 d-flex align-items-center imgDetailCard">
            <img 
              src={image} 
              alt={title} 
              className="img-fluid"
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
            
          <div className="col-md-6">
            <p className="mb-3">{description}</p>
             
            <p className="mb-3">Precio: ${price}</p>
            <div className="d-flex align-items-center">
                    <span className="me-2">Cantidad:</span>
                    <ButtonGroup>
                        <Button variant="outline-secondary" onClick={decreaseQuantity}>-</Button>
                        <Button variant="light" disabled style={{ width: '50px' }}>{quantity}</Button>
                        <Button variant="outline-secondary" onClick={increaseQuantity}>+</Button>
                    </ButtonGroup>
              </div>
          </div>
        </div>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddFloorToList}>Añadir al carrito</Button>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}
