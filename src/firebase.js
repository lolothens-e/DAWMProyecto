import { initializeApp } from "firebase/app";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  child
} from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MSG_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function saveVote(colorID) {
  const votosRef = ref(db, 'votes');
  const nuevoVotoRef = push(votosRef);
  const voto = {
    color: colorID,
    fecha: new Date().toISOString()
  };

  try {
    await set(nuevoVotoRef, voto);
    return { success: true, message: "Voto guardado exitosamente" };
  } catch {
    return { success: false, message: "Error al guardar el voto" };
  }
}

export async function getVotes() {
  const votosRef = ref(db);
  try {
    const snapshot = await get(child(votosRef, 'votes'));
    if (snapshot.exists()) return snapshot.val();
    else return {};
  } catch {
    return {};
  }
}
