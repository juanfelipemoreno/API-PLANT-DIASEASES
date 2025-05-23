// Clave para el almacenamiento en localStorage
const CART_KEY = 'carList';

// Obtener carrito desde localStorage
export function getCarList() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

// Guardar una lista completa en localStorage
export function saveCarList(list) {
  localStorage.setItem(CART_KEY, JSON.stringify(list));
      window.dispatchEvent(new Event('cartUpdated'));

}

// Agregar un ítem al carrito (si ya existe, incrementa cantidad)
export function addCarList(item) {
  const current = getCarList();
  const exists = current.find(i => i.common_name === item.common_name);

  let updatedCart;
  if (exists) {
    updatedCart = current.map(i =>
      i.common_name === item.common_name
        ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
        : i
    );
  } else {
    updatedCart = [...current, { ...item, quantity: item.quantity || 1 }];
  }

  saveCarList(updatedCart);
      window.dispatchEvent(new Event('cartUpdated'));

}

// Eliminar un ítem del carrito por su nombre común
export function removeFromCar(item) {
  const current = getCarList();
  const updated = current.filter(i => i.common_name !== item.common_name);
  saveCarList(updated);
      window.dispatchEvent(new Event('cartUpdated'));

}

// Vaciar todo el carrito
export function clearCarList() {
  localStorage.removeItem(CART_KEY);
      window.dispatchEvent(new Event('cartUpdated'));

}

export const updateCarListItem = (updatedItem) => {
  const carList = getCarList();
  const newList = carList.map(item =>
    item.common_name === updatedItem.common_name ? updatedItem : item
  );
  localStorage.setItem('carList', JSON.stringify(newList));
      window.dispatchEvent(new Event('cartUpdated'));

};