import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCarList, getCarList } from '../Utils/SendCar';
import { FormControl, InputGroup } from 'react-bootstrap';
import { AlertMessage } from "./ErrorComp";

export default function CardDetailComp({ show, onHide, image, title, description, price }) {

  const [count, setCount] = useState(1);
  const [error, setError] = useState({ message: '', type: '' });

  const handleAddFloorToList = () => {
    const floor = {
      "common_name": title,
      "image": image,
      "description": description,
      "price": price
    }
    addCarList(floor);
    //alert('!Planta añadida al carrito exitosamente!')
    setError({ message: '!Planta añadida al carrito exitosamente!', type: 'success' });
    console.log("Productos añadidos", getCarList())
  }

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
    }
  };

  return (
    <div>
      {error.message ? (<AlertMessage type={error.type} message={error.message} />) : (<div></div>)}
      <Modal show={show} onHide={onHide}
        size="xl" aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className='background-primary'>
          <Modal.Title id="contained-modal-title-vcenter" className="text-white fst-italic" ><b>{title}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 imgDetailCard container-center">
                <img
                  src={image}
                  alt={title}
                  className="img-fluid"
                  style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
                />
              </div>
              <div className="col-md-6">
                <p className="text-justify">{description}</p>
                <p><b>Precio: $</b>{price.toLocaleString()}</p>

                <div className="d-flex gap-3 p-2 ">
                  <InputGroup style={{ maxWidth: '150px' }}>
                    <Button variant="outline-secondary" onClick={handleDecrease}>-</Button>
                    <FormControl value={count} readOnly className="text-center" />
                    <Button variant="outline-secondary" onClick={handleIncrease}>+</Button>
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddFloorToList} className='btn-b fs-2'>Añadir al carrito</Button>
          <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
