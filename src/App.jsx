import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OverviewPage from "./pages/OverviewPage";
import Sidebar from "./components/common/Sidebar";
import { useAuth } from "./contexts/AuthContext"; // Importa o contexto de autenticação

function App() {
  const { user } = useAuth(); // Obtém o estado de autenticação do contexto

  return (
    <div>
      {user ? ( // Se o usuário estiver autenticado, mostra o Dashboard
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
          <Sidebar />
          <Routes>
            <Route path="/" element={<OverviewPage />} />
          </Routes>
        </div>
      ) : (
        // Caso contrário, redireciona para a tela de login
        <Routes>
          <Route path="/*" element={<LoginPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
