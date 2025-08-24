import { DoorOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    dataCriacao: "",
  });
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUserData = async () => {
      const authDataString = localStorage.getItem("token");
      const authData = JSON.parse(authDataString);
      const userToken = authData.token.token;

      try {
        const userId = authData.token.user.id;
        const apiUrl = `/users/${userId}`;
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        console.log(response);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getAllUsers = async () => {
      const authDataString = localStorage.getItem("token");
      const authData = JSON.parse(authDataString);
      const userToken = authData.token.token;

      try {
        const apiUrl = "/users";
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setAllUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsers();
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const results = allUsers.filter((user) =>
      user.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [searchTerm, allUsers]);

  const handleUserLogoff = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    navigate("/");
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (!userData) {
    return (
      <body className="bg-gray-900 flex w-full h-screen justify-center items-center">
        <h1 className="text-white text-xl">Carregando...</h1>
      </body>
    );
  }

  return (
    <body className="bg-gray-900 flex w-full h-screen justify-center items-center select-none text-white">
      <div className="bg-gray-800 flex flex-col shadow-lg rounded-md w-[90vw] md:w-[65vw] min-h-[40vw]">
        <nav className="bg-gray-700 flex w-full p-5 items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            className="flex items-center gap-2 font-bold"
            onClick={handleUserLogoff}
          >
            <DoorOpen />
            <h1>Sair</h1>
          </button>
        </nav>
        <div className="flex flex-col p-3 font-semibold h-full rounded-lg overflow-hidden">
          <nav className="flex items-center justify-between gap-4">
            <h1 className="font-bold text-2xl">
              Seja Bem Vindo! {userData.nome}.
            </h1>
            <input
              type="text"
              placeholder="Filtrar por nome..."
              className="p-2 rounded-md bg-slate-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </nav>
          <div className="bg-slate-700 flex flex-col w-full h-full mt-3 overflow-hidden overflow-y-auto gap-5 p-3">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-2 bg-slate-600 font-bold rounded-md hover:scale-[1.01] transition-all"
                >
                  <h2>
                    {"Nome: "}
                    <span className="font-normal">
                      {user.nome || "Erro..."}
                    </span>
                  </h2>
                  <p>
                    {"Email: "}
                    <span className="font-normal">
                      {user.email || "Erro..."}
                    </span>
                  </p>
                  <p>
                    {"Data Da Criação: "}
                    <span className="font-normal">
                      {new Date(user.data_criacao).toLocaleDateString() ||
                        "Erro..."}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">
                Nenhum usuário encontrado.
              </p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="bg-slate-600 p-2 rounded-md hover:bg-slate-700 disabled:bg-slate-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
              >
                Anterior
              </button>
              <span className="font-bold">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-slate-600 p-2 rounded-md hover:bg-slate-700 disabled:bg-slate-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </div>
    </body>
  );
};

export default Dashboard;
