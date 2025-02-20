
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tourRoutes from "../../routes/tour-toutes";

const TourPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const images = tourRoutes[id || ""] || [];
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step < images.length - 1) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleFinish = () => {
        navigate("/");
    };

    return (
        <div className="w-full">
            {images.length > 0 ? (
                <div className="w-full">
                    <div className="">
                        <img src={images[step]} alt={`Paso ${step}`} className="smooth-transition" />
                        <button className="prev-btn" onClick={handlePrev} disabled={step === 0}>Atrás</button>
                        <button className="next-btn" onClick={handleNext} disabled={step === images.length - 1}>Adelante</button>
                    </div>
                    {step === images.length - 1 && (
                        <div className="modal">
                            <p>Gracias por su visita</p>
                            <button onClick={() => setStep(0)}>Volver a la Ruta</button>
                            <button onClick={handleFinish}>Terminar</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>No hay ruta para este departamento.</p>
            )}
        </div>
    );
};

export default TourPage;
