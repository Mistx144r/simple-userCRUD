import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginOnDebounce, setLoginDebounce] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    senha: "",
  });

  const handleUserLogin = async (event) => {
    event.preventDefault();
    setLoginDebounce(true);

    try {
      const response = await axios.post("/users/login", loginData);
      localStorage.setItem("token", JSON.stringify(response.data));
      navigate("/dashboard");
      setErrorMessage("");
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMessage("Email ou senha inválidos. Tente novamente.");
    }

    setTimeout(function () {
      setLoginDebounce(false);
    }, 2000);
  };

  const handleLoginDataChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const changePageRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <body className="bg-gray-900 flex w-full h-screen justify-center items-center select-none">
        <form
          className="bg-gray-800 p-10 rounded-lg w-full max-w-[22rem] shadow-lg text-center flex flex-col"
          onSubmit={handleUserLogin}
        >
          <h1 className="text-2xl font-bold text-white mb-6">Login</h1>

          <div className="flex flex-col gap-4">
            <input
              name="email"
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="email"
              placeholder="lucasdev@devs.com.br"
              onChange={handleLoginDataChange}
              maxLength={80}
            ></input>
            <input
              name="senha"
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="password"
              placeholder="********"
              onChange={handleLoginDataChange}
              max={100}
            ></input>
          </div>

          <div className="flex flex-col items-center gap-2 text-white">
            <button
              className="bg-blue-500 px-4 py-2 rounded mt-4 w-full hover:bg-blue-600 active:bg-blue-700 transition disabled:bg-blue-950"
              type="submit"
              disabled={isLoginOnDebounce}
            >
              Login
            </button>
            <button
              className="bg-none px-4 py-2 rounded w-full hover:text-slate-300 active:text-slate-400 transition"
              onClick={changePageRegister}
              type="button"
            >
              Não tem conta? Crie uma.
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

export default LoginPage;
