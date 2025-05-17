const STORAGE_KEY = "carList";

// Función para obtener desde localStorage
function loadFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

let carList = loadFromStorage();

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carList));
}

export function addCarList(floor) {
  const existing = carList.find(item => item.common_name === floor.common_name);
  if (existing) {
    existing.quantity += 1;
  } else {
    carList.push({ ...floor, quantity: 1 });
  }
  saveToStorage();
}

export function getCarList() {
  return carList;
}

export function clearCarList() {
  carList = [];
  saveToStorage();
}

export function removeFromCar(id) {
  carList = carList.filter(floor => floor.id !== id);
  saveToStorage();
}
