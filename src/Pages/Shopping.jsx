import { Row, Card, Col, Container, Button, Alert } from 'react-bootstrap';
import NavbarComp from "../Components/Navbar/Navbar";
import { addCarList, getCarList, clearCarList, removeFromCar } from "../Utils/SendCar";
import { useState, useEffect } from 'react';

const Shopping = ({ list }) => {
  const [shop, setShop] = useState([])
  const [total, setTotal] = useState(0)
  const handleClearShop = () => {
    alert('Tu compra se ha hecho correctamente.');
    clearCarList();
    setShop([])
  }
  useEffect(() => {
    setShop(getCarList())
    if (shop.length > 0) {
      setTotal(shop.reduce((acc, item) => acc + item.price * item.quantity, 0))
    } else {
      setTotal(0)
    }
  }, [])
  const handleDelete = (floorShop) => {
    removeFromCar(floorShop);
    alert('La platana fue removida del carrito');
    setShop(shop.filter(floor => floor.common_name !== floorShop.common_name));
  }
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
                  <div className="d-flex flex-column" style={{alignItems : 'flex-start'}}>
                    <strong>{data.common_name}</strong>
                    <span>Precio: ${data.price}</span>
                    <span>Cantidad: {data.quantity}</span>
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
          <h5>Total: ${shop.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}</h5>
          <Button
            variant="primary"
            onClick={handleClearShop}
            disabled={total === 0}
          >
            Pagar
          </Button>
        </div>
      </Container>
    </>


  )
}

export default Shopping