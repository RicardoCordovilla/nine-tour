import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [deptId, setDeptId] = useState("");
  const navigate = useNavigate();

  const handleStartTour = () => {
    if (deptId) navigate(`/tour/${deptId}`);
  };

  const departments = [
    { id: "101", name: "Departamento 1" },
    // { id: "202", name: "Departamento 2" },
    // { id: "303", name: "Departamento 3" },
    // Agrega más departamentos según sea necesario
  ];

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Bienvenido</h1>
      <select
        className="select select-bordered w-full max-w-xs"
        value={deptId}
        onChange={(e) => setDeptId(e.target.value)}
      >
        <option value="" disabled>Seleccione un departamento</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>
      <button className="btn btn-active btn-neutral mt-4" onClick={handleStartTour}>
        Iniciar recorrido
      </button>
    </div>
  );
};

export default Home;