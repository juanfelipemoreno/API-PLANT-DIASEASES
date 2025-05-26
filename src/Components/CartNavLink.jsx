import { Nav, Badge } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { getCarList } from '../Utils/SendCar';

function CartNavLink() {
  const [itemCount, setItemCount] = useState(0);

  const updateCount = () => {
    const carList = getCarList();
    const totalItems = carList.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setItemCount(totalItems);
  };

  useEffect(() => {
    updateCount(); // Inicializa contador

    window.addEventListener('cartUpdated', updateCount); // Escuchar evento

    return () => {
      window.removeEventListener('cartUpdated', updateCount); // Cleanup
    };
  }, []);

  return (
    <Nav className="ms-auto" style={{ position: 'relative' }}>
      <div style={{ position: 'relative', padding: 0, marginRight: 30}}>
        <BsCart style={{ width: '50px', height: '30px', color: 'white' }} />
        {itemCount > 0 && (
          <Badge
            bg="danger"
            pill
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-10px',
              fontSize: '0.75rem',
            }}
          >
            {itemCount}
          </Badge>
        )}
      </div>
    </Nav>
  );
}

export default CartNavLink;