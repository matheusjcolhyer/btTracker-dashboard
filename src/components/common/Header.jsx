import { Bell, Languages } from "lucide-react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Certifique-se de que o caminho para o Firebase está correto
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogoff = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header
      className="bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 flex items-center justify-end px-6 py-4"
      style={{ backgroundColor: "#2E2E2E" }}
    >
      {/* Ações à direita */}
      <div className="flex items-center space-x-6">
        {/* Notificação com badge */}
        <div className="relative">
          <button className="text-gray-100">
            <Bell className="fas fa-bell"></Bell>{" "}
          </button>
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            11
          </span>
        </div>

        {/* Seletor de idioma */}
        <button className="text-gray-100">
          <Languages className="fas fa-globe"></Languages>{" "}
        </button>

        <div className="relative">
          {/* Avatar do usuário */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src="https://media.istockphoto.com/id/1437816897/pt/foto/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring-or.jpg?s=612x612&w=0&k=20&c=OsiL-G3rU8NzppNGl3Yh9exwYzoSfCrRb9gxawy1VR4="
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-gray-100 font-medium">Mirella Alves</span>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              <ul className="py-2">
                <li
                  className="px-4 py-2 text-gray-100 hover:bg-gray-700 cursor-pointer"
                  onClick={handleLogoff}
                >
                  Logoff
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
