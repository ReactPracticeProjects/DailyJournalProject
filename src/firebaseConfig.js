import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATn81_F-I_zkhoqTvG7EO5JST906xiCd4",
  authDomain: "dailyjournalapp-44d26.firebaseapp.com",
  projectId: "dailyjournalapp-44d26",
  storageBucket: "dailyjournalapp-44d26.firebasestorage.app",
  messagingSenderId: "898503597416",
  appId: "1:898503597416:web:2771873edd498d7e9d8add",
  measurementId: "G-F9C10EXY9T",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getFirestore(app);
