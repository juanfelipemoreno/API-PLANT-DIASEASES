import { Row, Card, Col, Container, Button, Alert } from 'react-bootstrap';
import NavbarComp from "../Components/Navbar/Navbar";
import { addCarList, getCarList, clearCarList, removeFromCar } from "../Utils/SendCar";
import { useState, useEffect } from 'react';
import PaymentDialog from '../Components/PaymentForm';

const Shopping = ({ list }) => {
  const [shop, setShop] = useState([]);
  const [total, setTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  const handleClearShop = () => {
    alert('Tu compra se ha hecho correctamente.');
    clearCarList();
    setShop([]);
  };

  const handleDelete = (floorShop) => {
    removeFromCar(floorShop);
    alert('La planta fue removida del carrito');
    setShop(shop.filter(floor => floor.common_name !== floorShop.common_name));
  };

  const increaseQuantity = (item) => {
    const updated = shop.map(floor =>
      floor.common_name === item.common_name
        ? { ...floor, quantity: floor.quantity + 1 }
        : floor
    );
    setShop(updated);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity <= 1) return;
    const updated = shop.map(floor =>
      floor.common_name === item.common_name
        ? { ...floor, quantity: floor.quantity - 1 }
        : floor
    );
    setShop(updated);
  };

  useEffect(() => {
    setShop(getCarList());
  }, []);

  useEffect(() => {
    if (shop.length > 0) {
      setTotal(shop.reduce((acc, item) => acc + item.price * item.quantity, 0));
    } else {
      setTotal(0);
    }
  }, [shop]);

  return (
    <>
      <NavbarComp />
      <Container className="my-4">
        <h3 className="mb-4">Carrito de Compras</h3>

        {shop.length > 0 ? (
          <div className="cart-list">
            {shop.map((data, index) => (
              <div
                key={index}
                className="cart-item d-flex align-items-center justify-content-between p-3 mb-3 border rounded shadow-sm"
              >
                <div className="d-flex align-items-center" style={{ gap: '1rem', flex: 1 }}>
                  <img
                    src={data.image || 'https://via.placeholder.com/100x100?text=Sin+imagen'}
                    alt={data.common_name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div className="d-flex flex-column">
                    <strong>{data.common_name}</strong>
                    <span>Precio: ${data.price}</span>
                    <div className="d-flex align-items-center mt-2">
                      <span className="me-2">Cantidad:</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => decreaseQuantity(data)}>-</Button>
                      <span className="mx-2">{data.quantity}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => increaseQuantity(data)}>+</Button>
                    </div>
                  </div>
                </div>

                <Button variant="outline-danger" onClick={() => handleDelete(data)}>Eliminar</Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No tienes nada en el carrito.</p>
        )}

        <hr className="my-4" />

        <div className="d-flex justify-content-between align-items-center">
          <h5>Total: ${total}</h5>
          <Button
            variant="primary"
            onClick={() => setShowPayment(true)}
            disabled={total === 0}
          >
            Pagar
          </Button>
        </div>

        <PaymentDialog
          show={showPayment}
          onHide={() => setShowPayment(false)}
          onSubmit={(data) => {
            console.log('Procesando pago con:', data);
            alert('Tu compra se ha hecho correctamente.');
            clearCarList();
            setShop([]);
            setShowPayment(false);
          }}
        />
      </Container>
    </>
  );
};

export default Shopping;
