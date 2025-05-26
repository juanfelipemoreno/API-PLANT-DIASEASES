import { React, useState } from "react";
import DetailIdentifyComp from "./DetailIdentifyComp";

const SuggestionsCarComp = ({ plant }) => {
    const [modalShow, setModalShow] = useState(false);

    const handleDetail = () => {
        setModalShow(true);
    };

    return (
        <>
        <div className="d-flex border-bottom py-3 gap-5">
            <div className="text-center container-center" style={{ width: "150px" }}>
                <div className="fw-bold text-success">{plant.probability}%</div>
            </div>

            <div className="d-flex gap-4">
                {plant.similar_images.map((src, idx) => (
                    <img
                        key={idx}
                        src={src.url}
                        alt="plant"
                        className="rounded"
                        style={{ width: "90px", height: "90px", objectFit: "cover" }}
                    />
                ))}
            </div>
            <div>
                <h5 className=" mx-3 mb-1 fs-6 text-start text-muted small mb-1">{plant.name.toUpperCase()}</h5>
                <hr className="m-1"/>
                <div className="d-flex gap-3">
                    <button className="btn-d" onClick={handleDetail} > ℹ️ Detalles Imagen</button>
                </div>
            </div>
            
        </div>
        <DetailIdentifyComp
                show={modalShow}
                onHide={() => setModalShow(false)}
                data = {plant}
            />
        </>

    );
};

export default SuggestionsCarComp;