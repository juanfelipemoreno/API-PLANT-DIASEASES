import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CardDetailComp({ show, onHide, image, title, description }) {
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
            <p>{description}</p>
          </div>
        </div>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}
