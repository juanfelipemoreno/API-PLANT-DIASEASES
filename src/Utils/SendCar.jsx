let carList = [];

export function addCarList(floor) {
  const existing = carList.find(item => item.common_name === floor.common_name);
  if (existing) {
    existing.quantity += 1;
  } else {
    carList.push({ ...floor, quantity: 1 });
  }
}

export function getCarList() {
    return carList;
}

export function clearCarList() {
    carList = []
}

export function removeFromCar(id) {
    carList = carList.filter(floor => floor.id !== id);
 }