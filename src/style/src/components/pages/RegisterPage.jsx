import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateAcountDebounce, setCreateDebounce] = useState(false);
  const [createData, setCreateData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleUserCreateAccount = async (event) => {
    event.preventDefault();
    setCreateDebounce(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        createData
      );
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      console.error("Erro no registro do usuario:", error);
      setErrorMessage(error.response.data.message);
    }

    setTimeout(function () {
      setCreateDebounce(false);
    }, 2000);
  };

  const handleCreateDataChange = (e) => {
    setCreateData({ ...createData, [e.target.name]: e.target.value });
  };

  const changePageLogin = () => {
    navigate("/");
  };

  return (
    <>
      <body className="bg-gray-900 flex w-full h-screen justify-center items-center select-none font-sans">
        <form
          className="bg-gray-800 p-10 rounded-lg w-full max-w-[22rem] shadow-lg text-center flex flex-col"
          onSubmit={handleUserCreateAccount}
        >
          <h1 className="text-2xl font-bold text-white mb-6">Registro</h1>

          <div className="flex flex-col gap-4">
            <input
              name="nome"
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="text"
              placeholder="Nome Completo"
              onChange={handleCreateDataChange}
            ></input>
            <input
              name="email"
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="email"
              placeholder="lucasdev@devs.com.br"
              onChange={handleCreateDataChange}
            ></input>
            <input
              name="senha"
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="password"
              placeholder="********"
              onChange={handleCreateDataChange}
            ></input>
          </div>

          <div className="flex flex-col items-center gap-2 text-white">
            <button
              className="bg-blue-500 px-4 py-2 rounded mt-4 w-full hover:bg-blue-600 active:bg-blue-700 transition disabled:bg-blue-900"
              disabled={isCreateAcountDebounce}
              type="submit"
            >
              Registrar
            </button>
            <button
              className="bg-none px-4 py-2 rounded w-full hover:text-slate-300 active:text-slate-400 transition"
              onClick={changePageLogin}
              type="button"
            >
              Já tem uma conta? Faça login.
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-600 font-light">{errorMessage}</p>
          )}
        </form>
      </body>
    </>
  );
}

export default RegisterPage;
