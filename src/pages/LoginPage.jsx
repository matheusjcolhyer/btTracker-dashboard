import { useState } from "react";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Email ou senha incorretos");
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/");
    } catch (err) {
      setError("Não foi possível entrar como convidado.");
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        backgroundImage: "url('/login-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-gray-800 flex flex-col justify-center bg-opacity-50 p-10 rounded-lg shadow-lg text-gray-100 max-w-md w-full">
        <div className="flex items-center justify-center">
          <img src="/logo.png" className="w-32 mx-auto" alt="Logo" />
        </div>
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Bem vindo ao <span className="text-red-500">BTTracker</span>
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-2">
              Usuário:
            </label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 placeholder-gray-500 text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-2">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 placeholder-gray-500 text-gray-100"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-600 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                Manter conectado
              </label>
            </div>
            <a href="#" className="text-sm text-gray-400 hover:underline">
              Esqueceu a senha?
            </a>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Entrar
          </button>
        </form>

        {/* Botão de convidado */}
        <button
          onClick={handleGuestLogin}
          className="w-full mt-4 py-3 border border-green-400 text-white rounded-lg bg-green-500 hover:text-white transition"
        >
          Brazil Conference Guest
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
