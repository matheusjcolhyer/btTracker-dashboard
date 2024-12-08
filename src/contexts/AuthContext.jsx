import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Para monitorar o estado de autenticação
import { auth } from "../firebase"; // Certifique-se de que o Firebase está configurado corretamente

// Criação do contexto
const AuthContext = createContext();

// Hook personalizado para acessar o contexto facilmente
export const useAuth = () => useContext(AuthContext);

// Componente de provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Armazena o usuário autenticado
  const [loading, setLoading] = useState(true); // Indica se o estado está carregando

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup do listener
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
