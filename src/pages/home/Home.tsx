// src/pages/Home.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [deptId, setDeptId] = useState("");
  const navigate = useNavigate();

  const handleStartTour = () => {
    if (deptId) navigate(`/tour/${deptId}`);
  };

  return (
    <div className="w-full">
      <h1>Bienvenido</h1>
      <input
        type="text" placeholder="Ingrese el número de departamento"
        className="input input-bordered w-full max-w-xs"
        value={deptId}
        onChange={(e) => setDeptId(e.target.value)}
      />
      <button className="btn btn-active btn-neutral" onClick={handleStartTour}>
        Iniciar recorrido
      </button>
    </div >
  );
};

export default Home;
