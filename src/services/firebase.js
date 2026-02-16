import { initializeApp } from "firebase/app";
import { getAuth ,  GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4rFnTONQVNqWaPlgZszCyureBVdgzR-k",
  authDomain: "f-test-bebd5.firebaseapp.com",
  projectId: "f-test-bebd5",
  storageBucket: "f-test-bebd5.firebasestorage.app",
  messagingSenderId: "1031089954990",
  appId: "1:1031089954990:web:a2ae9204ff88065c404d3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;