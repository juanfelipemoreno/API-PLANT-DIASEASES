import { React, useState, useEffect } from "react";
import { Button, OverlayTrigger, Popover, Card } from 'react-bootstrap';
import { addCarList, getCarList, clearCarList, removeFromCar } from "../Utils/SendCar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import CartNavLink from "./CartNavLink";
import { AlertMessage } from './ErrorComp';
import { useNavigate } from "react-router-dom";

export const ShoppingComp = () => {
    const [shop, setShop] = useState([])
    const [total, setTotal] = useState(0)
    const [refres, setRefres] = useState(0)
    const [error, setError] = useState({ message: '', type: '' });
    const navigate = useNavigate()

    const getDatShop = () => {
        setShop(getCarList())
        if (shop.length > 0) {
            setTotal(shop.reduce((acc, item) => acc + item.price * item.quantity, 0))
        } else {
            setTotal(0)
        }
    }
    useEffect(() => {
        getDatShop()
    }, [])

    useEffect(() => {
        getDatShop()
    }, [refres])

    const handleDelete = (floorShop) => {
        removeFromCar(floorShop);
        setError({ message: '!La platana fue removida del carrito!', type: 'success' });
        setShop(shop.filter(floor => floor.common_name !== floorShop.common_name));
    }

    return (
        <>
            {error.message ? (<AlertMessage type={error.type} message={error.message} />) : (<div></div>)}
            <div className="px-2">
                <OverlayTrigger

                    trigger="click"
                    key='bottom'
                    placement='auto-start'
                    overlay={
                        <Popover id={`popover-positioned-bottom`} style={{ '--bs-popover-max-width': '600px' }}>
                            <Popover.Header className="text-white font-serif" style={{ backgroundColor: '#388e3c' }} as="h2">Carrito</Popover.Header>
                            <Popover.Body>
                                {
                                    (shop && shop.length > 0) ? (
                                        <>
                                            {
                                                shop.map((data, index) => (
                                                    <Card style={{ width: '100%', maxWidth: '350px' }} key={data.id}>
                                                        <div className="d-flex align-items-center">
                                                            <div className="container-center" style={{ width: '70px', height: '70px', objectFit: 'contain', marginInline: '10px' }}>
                                                                <Card.Img
                                                                    variant="left"
                                                                    alt={data.common_name}
                                                                    src={data.image || 'https://via.placeholder.com/100x100?text=Sin+imagen'}
                                                                    style={{ width: '100%', height: '100%', marginInline: '10px' }}
                                                                />
                                                            </div>
                                                            <div className="d-flex flex-column px-2">
                                                                <Card.Title className="truncate-text title font-serif px-3 pt-1" style={{fontSize: '12px'}}><b>{data.common_name.toUpperCase()}</b></Card.Title>

                                                                <Card.Body className="fs-6 d-flex flex-row-reverse px-2 p-0 gap-3 ">
                                                                    <Card.Text className="font-serif" style={{minWidth: '65px'}}>${data.price * data.quantity}</Card.Text>
                                                                    <strong className="font-serif">Precio:</strong>
                                                                    <Card.Text className="px-2 font-serif" >{data.quantity}u</Card.Text>
                                                                </Card.Body>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => handleDelete(data)}
                                                                    className="mx-2 mb-2"
                                                                >
                                                                    Eliminar
                                                                </Button>

                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))
                                            }
                                            <hr />
                                            <div className="text-end fw-bold fs-5 font-serif" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                                <button className="btn-c font-serif" onClick={() => navigate('/shooping')}>Ir al carrito</button>
                                                Total: ${shop.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
                                            </div>
                                        </>
                                    ) : (
                                        <div>No hay productos</div>
                                    )

                                }
                            </Popover.Body>
                        </Popover>
                    }
                >

                    <div style={{ color: 'white', cursor: 'pointer' }} onClick={() => setRefres(r => r + 1)}>
                        <CartNavLink />
                    </div>

                </OverlayTrigger>
            </div>
        </>
    )
}