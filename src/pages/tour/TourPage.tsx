import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tourRoutes from "../../routes/tour-routes";
import "./TourPage.css";

const TourPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const images = useMemo(() => tourRoutes[id || ""] || [], [id]);
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (images.length > 0) {
            let loaded = 0;
            const tempLoadedImages: string[] = [];

            // Precargar imágenes
            images.forEach((image) => {
                const img = new Image();
                img.src = image;
                img.onload = () => {
                    loaded++;
                    tempLoadedImages.push(image);

                    // Cuando todas las imágenes estén cargadas, ocultar el loader
                    if (loaded === images.length) {
                        setIsLoading(false);
                    }
                };
            });
        } else {
            setIsLoading(false);
        }
    }, [images]);

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

            <div className="w-full flex flex-col items-center justify-center relative">
                {isLoading ? (
                    // Muestra un mensaje de carga hasta que las imágenes estén precargadas
                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold">Cargando imágenes...</p>
                        <div className="loader mt-4"></div>
                    </div>
                ) : (
                    images.length > 0 && (
                        <div className="w-full flex flex-col items-center relative mt-4">
                            <div className="relative w-[400px] h-[300px] flex items-center justify-center">
                                <img
                                    key={step}
                                    src={images[step]}
                                    alt={`Paso ${step}`}
                                    className="absolute object-cover rounded-md transition-opacity duration-500"
                                />
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
                    )
                )}
            </div>
        </div>
    );
};

export default TourPage;
