import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [deptId, setDeptId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const handleSelect = (id: string) => {
    setDeptId(id);
    setDropdownOpen(false);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Bienvenido</h1>
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {deptId ? departments.find(dept => dept.id === deptId)?.name : "Seleccione un departamento"}
        </div>
        {dropdownOpen && (
          <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
            {departments.map((dept) => (
              <li key={dept.id} className="text-black">
                <a onClick={() => handleSelect(dept.id)}>{dept.name}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="btn btn-active btn-neutral mt-4" onClick={handleStartTour}>
        Iniciar recorrido
      </button>
    </div>
  );
};

export default Home;