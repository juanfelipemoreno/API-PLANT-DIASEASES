import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ButtonGroup } from 'react-bootstrap';
import { addCarList, getCarList } from '../Utils/SendCar';

export default function DetailIdentifyComp({ show, onHide, data }) {
  const [quantity, setQuantity] = useState(1);
  const [modalShow, setModalShow] = useState(false);

  const handleDetail = () => {
    setModalShow(true);
  };
  console.log(data.details);
  const [details, setDetails] = useState(data.details);

  return (
    <div>
      <Modal show={show} onHide={onHide}
        size="lg" aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <b>{details.local_name?.toUpperCase()}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">

              <div className="col-md-12">
                <p className="mb-3">{details.description}</p>
              </div>
            </div>
            {details.classification?.length > 0 && (
              <div className="row">
                <div className="col-12">
                  <hr/>
                  <h6>Clasificación:</h6>
                  <ul>
                    {details.classification.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {details.common_names?.length > 0 && (
              <div className="row">
                <div className="col-12">
                  <hr/>
                  <h6>Nombre(s) común(es):</h6>
                  <ul>
                    {details.common_names.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {details.treatment?.biological?.length > 0 && (
              <div className="row">
                <div className="col-12">
                  <hr/>
                  <h6>Tratamiento biológico:</h6>
                  <ul>
                    {details.treatment.biological.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {details.treatment?.prevention?.length > 0 && (
              <div className="row">
                <div className="col-12">
                  <hr/>
                  <h6>Prevención:</h6>
                  <ul>
                    {details.treatment.prevention.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
