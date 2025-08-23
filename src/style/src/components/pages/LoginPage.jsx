import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserLogin = async (event) => {
    event.preventDefault();
    console.log(loginData);

    console.log("Tentando fazer login com:", loginData);

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        loginData
      );
      console.log("Resposta do servidor:", response.data);
      // Ex: localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMessage("Email ou senha inválidos. Tente novamente.");
    }
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
            ></input>
            <input
              name="password"
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="password"
              placeholder="********"
              onChange={handleLoginDataChange}
            ></input>
          </div>

          <div className="flex flex-col items-center gap-2 text-white">
            <button
              className="bg-blue-500 px-4 py-2 rounded mt-4 w-full hover:bg-blue-600 active:bg-blue-700 transition"
              type="submit"
            >
              Login
            </button>
            <button
              className="bg-none px-4 py-2 rounded w-full hover:text-slate-300 active:text-slate-400 transition"
              onClick={changePageRegister}
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
