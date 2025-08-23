import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const changePageLogin = () => {
    navigate("/");
  };

  return (
    <>
      <body className="bg-gray-900 flex w-full h-screen justify-center items-center select-none font-sans">
        <section className="bg-gray-800 p-10 rounded-lg w-full max-w-[22rem] shadow-lg text-center flex flex-col">
          <h1 className="text-2xl font-bold text-white mb-6">Registro</h1>

          <div className="flex flex-col gap-4">
            <input
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="text"
              placeholder="Nome Completo"
            ></input>
            <input
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="email"
              placeholder="lucasdev@devs.com.br"
            ></input>
            <input
              className="p-1 rounded-md focus-within:bg-slate-200 transition-all"
              type="password"
              placeholder="********"
            ></input>
          </div>

          <div className="flex flex-col items-center gap-2 text-white">
            <button className="bg-blue-500 px-4 py-2 rounded mt-4 w-full hover:bg-blue-600 active:bg-blue-700 transition">
              Registrar
            </button>
            <button
              className="bg-none px-4 py-2 rounded w-full hover:text-slate-300 active:text-slate-400 transition"
              onClick={changePageLogin}
            >
              Já tem uma conta? Faça login.
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-600 font-light">{errorMessage}</p>
          )}
        </section>
      </body>
    </>
  );
}

export default RegisterPage;
