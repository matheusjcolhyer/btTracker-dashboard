import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_KEY,
  apiKey: "AIzaSyBx7aoIlNen6lS6U5MQjmItVsKMQn5ys04",
  authDomain: "bttracker-31adc.firebaseapp.com",
  projectId: "bttracker-31adc",
  storageBucket: "bttracker-31adc.firebasestorage.app",
  messagingSenderId: "876502646308",
  appId: "1:876502646308:web:69279c9524f455b4d7a2b1",
  measurementId: "G-Y7D4KPR9N0",
};

// Inicialize o app apenas se já não estiver inicializado
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exporta a instância de autenticação
export const auth = getAuth(app);
