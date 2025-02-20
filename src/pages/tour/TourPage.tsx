import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import tourRoutes from "../../routes/tour-toutes";
import "./TourPage.css";

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
        <div className="w-full h-screen flex flex-col items-center justify-center relative">
            <h1 className="text-2xl font-bold text-center mt-4">Departamento {id}</h1>
            <div className="w-full flex flex-col items-center justify-center bg relative">
                {images.length > 0 ? (
                    <div className="w-full flex flex-col items-center relative mt-4">
                        <div className="relative w-[400px] h-[300px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={step} // Para que detecte cambios y haga la animación
                                    src={images[step]}
                                    alt={`Paso ${step}`}
                                    className="absolute object-cover rounded-md"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.2 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Botón atrás */}
                        <button
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-slate-800 bg-opacity-80
                        px-4 py-2 rounded-md disabled:opacity-50"
                            onClick={handlePrev}
                            disabled={step === 0}
                        >
                            Atrás
                        </button>

                        {/* Botón siguiente / finalizar */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white">
                            {step === images.length - 1 ? (
                                <button
                                    className="btn btn-active btn-primary mt-4"
                                    onClick={handleFinish}
                                >
                                    Finalizar
                                </button>
                            ) : (
                                <button
                                    className="btn btn-active btn-neutral mt-4 bg-slate-800 bg-opacity-80 px-4 py-2 rounded-md"
                                    onClick={handleNext}
                                >
                                    Adelante
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>No hay ruta para este departamento.</p>
                )}

            </div>
        </div>
    );
};

export default TourPage;
