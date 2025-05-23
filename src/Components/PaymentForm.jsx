import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function PaymentDialog({ show, onHide, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    onHide(); // cerrar modal al enviar
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Formulario de Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Juan Pérez"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Calle 123, Ciudad"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Número de tarjeta</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Expiración</Form.Label>
                <Form.Control
                  type="text"
                  name="expiration"
                  value={formData.expiration}
                  onChange={handleChange}
                  placeholder="MM/AA"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancelar
            </Button>
            <Button variant="success" type="submit">
              Pagar ahora
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentDialog;
