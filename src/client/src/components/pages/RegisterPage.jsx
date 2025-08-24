import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [registerButton, setRegisterButton] = useState("Registrar");
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
    setRegisterButton("Validando...");

    setTimeout(function () {
      setCreateDebounce(false);
      setRegisterButton("Registrar");
    }, 2000);

    const email = createData.email.trim();
    const emailRegex = /^[-a-zA-Z0-9._%+]+@[-a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Digite um email válido.");
      return;
    }

    try {
      const response = await axios.post("/users", createData);
      setRegisterButton("Sucesso!");
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      console.error("Erro no registro do usuario:", error);
      setErrorMessage(error.response.data.message);
    }
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
              maxLength={80}
              onChange={handleCreateDataChange}
              required
              minLength={15}
            ></input>
            <input
              name="email"
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="email"
              placeholder="lucasdev@devs.com.br"
              maxLength={80}
              min={10}
              required
              onChange={handleCreateDataChange}
            ></input>
            <input
              name="senha"
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="password"
              placeholder="********"
              maxLength={100}
              min={12}
              required
              onChange={handleCreateDataChange}
            ></input>
          </div>

          <div className="flex flex-col items-center gap-2 text-white">
            <button
              className="bg-blue-500 px-4 py-2 rounded mt-4 w-full hover:bg-blue-600 active:bg-blue-700 transition disabled:bg-blue-900"
              disabled={isCreateAcountDebounce}
              type="submit"
            >
              {registerButton}
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
